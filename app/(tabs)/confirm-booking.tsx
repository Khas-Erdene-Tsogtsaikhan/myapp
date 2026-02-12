import { useAuth } from '@/store/AuthStore';
import { useBookings } from '@/store/BookingsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmBookingScreen() {
  const router = useRouter();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const params = useLocalSearchParams<{
    walkerId: string;
    walkerName: string;
    selectedDuration: string;
    selectedTimeSlot: string;
    selectedDateISO: string;
    selectedAddOns: string;
    notes: string;
    totalPrice: string;
  }>();

  // Parse params with validation
  const walkerId = params.walkerId || '';
  const walkerName = params.walkerName || '';
  const selectedDuration = parseInt(params.selectedDuration || '30', 10);
  const selectedTimeSlot = params.selectedTimeSlot || '';
  const selectedDateISO = params.selectedDateISO || '';
  const totalPrice = parseFloat(params.totalPrice || '0');

  let selectedAddOns: string[] = [];
  try {
    selectedAddOns = params.selectedAddOns ? JSON.parse(params.selectedAddOns) : [];
  } catch {
    selectedAddOns = [];
  }

  const notes = params.notes || '';

  // Build startTimeISO
  const [year, month, day] = selectedDateISO.split('-');
  const [hours, minutes] = selectedTimeSlot.split(':');
  const startTimeISO = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hours, 10),
    parseInt(minutes, 10)
  ).toISOString();

  const serviceName = `${selectedDuration} минут алхах`;

  const handleSubmitBooking = async () => {
    if (!user) {
      Alert.alert('Алдаа', 'Захиалга үүсгэхийн тулд та нэвтэрсэн байх ёстой');
      return;
    }

    setSubmitting(true);

    const { error } = await addBooking({
      category: 'walking',
      providerId: walkerId,
      providerName: walkerName,
      serviceName,
      startTimeISO,
      priceUSD: totalPrice,
      status: 'pending',
      addOns: selectedAddOns,
      notes,
    });

    setSubmitting(false);

    if (error) {
      Alert.alert('Алдаа', error.message || 'Захиалга үүсгэх амжилтгүй');
    } else {
      router.replace('/(tabs)/bookings');
    }
  };

  const addOnLabels: Record<string, string> = {
    'water-refill': 'Ус дүүргэх',
    'photo-updates': 'Зургийн шинэчлэл',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Захиалга баталгаажуулах</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Захиалгын хураангуй</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Алхагч:</Text>
            <Text style={styles.summaryValue}>{walkerName}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Үйлчилгээ:</Text>
            <Text style={styles.summaryValue}>{serviceName}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Огноо:</Text>
            <Text style={styles.summaryValue}>
              {new Date(selectedDateISO).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Цаг:</Text>
            <Text style={styles.summaryValue}>{selectedTimeSlot}</Text>
          </View>

          {selectedAddOns.length > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Нэмэлтүүд:</Text>
              <Text style={styles.summaryValue}>
                {selectedAddOns.map((id) => addOnLabels[id] || id).join(', ')}
              </Text>
            </View>
          )}

          {notes && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Тэмдэглэл:</Text>
              <Text style={styles.summaryValue}>{notes}</Text>
            </View>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Нийт үнэ:</Text>
            <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmitBooking}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Захиалга илгээх</Text>
          )}
        </TouchableOpacity>
      </View>
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    minWidth: 80,
  },
  summaryValue: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
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
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});

