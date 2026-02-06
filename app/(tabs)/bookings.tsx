import { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useBookings } from '@/store/BookingsStore';
import { BookingStatus } from '@/types/booking';

const STATUSES: BookingStatus[] = ['pending', 'accepted', 'completed', 'cancelled'];

export default function BookingsScreen() {
  const router = useRouter();
  const { bookings } = useBookings();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'all'>('all');

  const filteredBookings =
    selectedStatus === 'all'
      ? bookings
      : bookings.filter((b) => b.status === selectedStatus);

  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'accepted':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getStatusLabel = (status: BookingStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Status Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statusFilter}
        contentContainerStyle={styles.statusFilterContent}
      >
        <TouchableOpacity
          style={[styles.statusButton, selectedStatus === 'all' && styles.statusButtonSelected]}
          onPress={() => setSelectedStatus('all')}
        >
          <Text
            style={[
              styles.statusButtonText,
              selectedStatus === 'all' && styles.statusButtonTextSelected,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {STATUSES.map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.statusButton, selectedStatus === status && styles.statusButtonSelected]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text
              style={[
                styles.statusButtonText,
                selectedStatus === status && styles.statusButtonTextSelected,
              ]}
            >
              {getStatusLabel(status)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bookings List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>📅</Text>
            <Text style={styles.emptyStateText}>No bookings found</Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedStatus === 'all'
                ? 'Your bookings will appear here'
                : `No ${selectedStatus} bookings`}
            </Text>
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {filteredBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                style={styles.bookingCard}
                onPress={() =>
                  router.push({
                    pathname: '/booking-details',
                    params: { bookingId: booking.id },
                  })
                }
              >
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingService}>{booking.serviceName}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: getStatusColor(booking.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: getStatusColor(booking.status) }]}
                    >
                      {getStatusLabel(booking.status)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.bookingProvider}>{booking.providerName}</Text>
                <Text style={styles.bookingDateTime}>{formatDateTime(booking.startTimeISO)}</Text>
                <View style={styles.bookingFooter}>
                  <Text style={styles.bookingPrice}>${booking.priceUSD.toFixed(2)}</Text>
                  {booking.addOns.length > 0 && (
                    <Text style={styles.bookingAddOns}>
                      +{booking.addOns.length} add-on{booking.addOns.length > 1 ? 's' : ''}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  statusFilter: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  statusFilterContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  statusButtonSelected: {
    backgroundColor: '#FF6B35',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  statusButtonTextSelected: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666',
  },
  bookingsList: {
    gap: 16,
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingService: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    flex: 1,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingProvider: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  bookingDateTime: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  bookingAddOns: {
    fontSize: 14,
    color: '#666',
  },
});

