import { useBookings } from '@/store/BookingsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookingDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ bookingId: string }>();
  const { getBookingById, cancelBooking } = useBookings();
  const [cancelling, setCancelling] = useState(false);

  const booking = getBookingById(params.bookingId || '');

  const handleCancelBooking = () => {
    if (!booking) return;

    Alert.alert(
      'Захиалга цуцлах',
      'Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?',
      [
        {
          text: 'Үгүй',
          style: 'cancel',
        },
        {
          text: 'Тийм, Цуцлах',
          style: 'destructive',
          onPress: async () => {
            setCancelling(true);
            const { error } = await cancelBooking(booking.id);
            setCancelling(false);

            if (error) {
              Alert.alert('Алдаа', error.message || 'Захиалга цуцлах амжилтгүй');
            } else {
              Alert.alert('Амжилттай', 'Захиалга амжилттай цуцлагдлаа', [
                {
                  text: 'Тийм',
                  onPress: () => router.back(),
                },
              ]);
            }
          },
        },
      ]
    );
  };

  const canCancel = booking && (booking.status === 'pending' || booking.status === 'accepted');

  if (!booking) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Захиалга олдсонгүй</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string): string => {
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

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const addOnLabels: Record<string, string> = {
    'water-refill': 'Ус дүүргэх',
    'photo-updates': 'Зургийн шинэчлэл',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={() => router.back()}>
          ← Буцах
        </Text>
        <Text style={styles.headerTitle}>Захиалгын дэлгэрэнгүй</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsCard}>
          <View style={styles.statusSection}>
            <Text style={styles.statusLabel}>Төлөв</Text>
            <View
              style={[
                styles.statusPill,
                { backgroundColor: getStatusColor(booking.status) + '20' },
              ]}
            >
              <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                {booking.status === 'pending' ? 'Хүлээгдэж буй' :
                 booking.status === 'accepted' ? 'Хүлээн авсан' :
                 booking.status === 'completed' ? 'Дууссан' :
                 booking.status === 'cancelled' ? 'Цуцлагдсан' : booking.status}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Үйлчилгээ</Text>
            <Text style={styles.detailValue}>{booking.serviceName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Үйлчилгээ үзүүлэгч</Text>
            <Text style={styles.detailValue}>{booking.providerName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Огноо ба цаг</Text>
            <Text style={styles.detailValue}>{formatDateTime(booking.startTimeISO)}</Text>
          </View>

          {booking.addOns.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Нэмэлтүүд</Text>
              <Text style={styles.detailValue}>
                {booking.addOns.map((id) => addOnLabels[id] || id).join(', ')}
              </Text>
            </View>
          )}

          {booking.notes && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Тэмдэглэл</Text>
              <Text style={styles.detailValue}>{booking.notes}</Text>
            </View>
          )}

          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Нийт үнэ</Text>
            <Text style={styles.priceValue}>${booking.priceUSD.toFixed(2)}</Text>
          </View>
        </View>

        {canCancel && (
          <TouchableOpacity
            style={[styles.cancelButton, cancelling && styles.cancelButtonDisabled]}
            onPress={handleCancelBooking}
            disabled={cancelling}
          >
            {cancelling ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.cancelButtonText}>Захиалга цуцлах</Text>
            )}
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  statusPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailRow: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#111',
  },
  priceSection: {
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButtonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

