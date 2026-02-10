import { supabase } from '@/lib/supabase';
import { Booking } from '@/types/booking';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthStore';

interface BookingsContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<{ error: Error | null }>;
  cancelBooking: (id: string) => Promise<{ error: Error | null }>;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user) {
      setBookings([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform database rows to Booking interface
      const transformedBookings: Booking[] = (data || []).map((row) => ({
        id: row.id,
        category: row.category,
        providerId: row.provider_id,
        providerName: row.provider_name,
        serviceName: row.service_name,
        startTimeISO: row.start_time_iso,
        priceUSD: parseFloat(row.price_usd),
        status: row.status,
        addOns: Array.isArray(row.add_ons) ? row.add_ons : [],
        notes: row.notes || '',
      }));

      setBookings(transformedBookings);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bookings';
      setError(errorMessage);
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [user, fetchBookings]);

  const addBooking = useCallback(
    async (booking: Omit<Booking, 'id'>) => {
      if (!user) {
        return { error: new Error('User not authenticated') };
      }

      setError(null);

      try {
        const { data, error: insertError } = await supabase
          .from('bookings')
          .insert({
            user_id: user.id,
            category: booking.category,
            provider_id: booking.providerId,
            provider_name: booking.providerName,
            service_name: booking.serviceName,
            start_time_iso: booking.startTimeISO,
            price_usd: booking.priceUSD.toString(),
            status: booking.status,
            add_ons: booking.addOns,
            notes: booking.notes,
          })
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        // Transform and add to local state
        const newBooking: Booking = {
          id: data.id,
          category: data.category,
          providerId: data.provider_id,
          providerName: data.provider_name,
          serviceName: data.service_name,
          startTimeISO: data.start_time_iso,
          priceUSD: parseFloat(data.price_usd),
          status: data.status,
          addOns: Array.isArray(data.add_ons) ? data.add_ons : [],
          notes: data.notes || '',
        };

        setBookings((prev) => [newBooking, ...prev]);
        return { error: null };
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create booking');
        setError(error.message);
        console.error('Error creating booking:', err);
        return { error };
      }
    },
    [user]
  );

  const cancelBooking = useCallback(
    async (id: string) => {
      if (!user) {
        return { error: new Error('User not authenticated') };
      }

      setError(null);

      try {
        const { error: updateError } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', id)
          .eq('user_id', user.id);

        if (updateError) {
          throw updateError;
        }

        // Update local state
        setBookings((prev) =>
          prev.map((booking) => (booking.id === id ? { ...booking, status: 'cancelled' } : booking))
        );

        return { error: null };
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to cancel booking');
        setError(error.message);
        console.error('Error cancelling booking:', err);
        return { error };
      }
    },
    [user]
  );

  const getBookingById = useCallback(
    (id: string) => {
      return bookings.find((b) => b.id === id);
    },
    [bookings]
  );

  return (
    <BookingsContext.Provider
      value={{ bookings, loading, error, fetchBookings, addBooking, cancelBooking, getBookingById }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
}
