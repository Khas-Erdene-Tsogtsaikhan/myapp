import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Booking } from '@/types/booking';

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = useCallback((booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  }, []);

  const getBookingById = useCallback((id: string) => {
    return bookings.find((b) => b.id === id);
  }, [bookings]);

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, getBookingById }}>
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

