import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AVAILABLE_TIME_SLOTS = ['10:00', '11:30', '14:00', '16:30'];
const ADD_ONS = [
  { id: 'water-refill', label: 'Ус дүүргэх', price: 2 },
  { id: 'photo-updates', label: 'Зургийн шинэчлэл', price: 5 },
];

export default function WalkerDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ walkerId: string; walkerName: string }>();

  const [selectedDuration, setSelectedDuration] = useState<30 | 60>(30);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const walkerPrices = {
    30: 25,
    60: 45,
  };

  const basePrice = walkerPrices[selectedDuration];
  const addOnsPrice = selectedAddOns.reduce((sum, addOnId) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);
  const totalPrice = basePrice + addOnsPrice;

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleContinue = () => {
    if (!selectedTimeSlot) {
      return;
    }

    const today = new Date();
    const [hours, minutes] = selectedTimeSlot.split(':');
    const startTime = new Date(today);
    startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    router.push({
      pathname: '/confirm-booking',
      params: {
        walkerId: params.walkerId,
        walkerName: params.walkerName,
        selectedDuration: selectedDuration.toString(),
        selectedTimeSlot,
        selectedDateISO: today.toISOString().split('T')[0],
        selectedAddOns: JSON.stringify(selectedAddOns),
        notes,
        totalPrice: totalPrice.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.walkerName}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Services Offered */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Саналын үйлчилгээнүүд</Text>
          <View style={styles.durationContainer}>
            <TouchableOpacity
              style={[
                styles.durationButton,
                selectedDuration === 30 && styles.durationButtonSelected,
              ]}
              onPress={() => setSelectedDuration(30)}
            >
              <Text
                style={[
                  styles.durationText,
                  selectedDuration === 30 && styles.durationTextSelected,
                ]}
              >
                30 минут алхах
              </Text>
              <Text
                style={[
                  styles.durationPrice,
                  selectedDuration === 30 && styles.durationPriceSelected,
                ]}
              >
                ${walkerPrices[30]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.durationButton,
                selectedDuration === 60 && styles.durationButtonSelected,
              ]}
              onPress={() => setSelectedDuration(60)}
            >
              <Text
                style={[
                  styles.durationText,
                  selectedDuration === 60 && styles.durationTextSelected,
                ]}
              >
                60 минут алхах
              </Text>
              <Text
                style={[
                  styles.durationPrice,
                  selectedDuration === 60 && styles.durationPriceSelected,
                ]}
              >
                ${walkerPrices[60]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Боломжтой цагийн хуваарь (Өнөөдөр)</Text>
          <View style={styles.timeSlotsContainer}>
            {AVAILABLE_TIME_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlotButton,
                  selectedTimeSlot === slot && styles.timeSlotButtonSelected,
                ]}
                onPress={() => setSelectedTimeSlot(slot)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTimeSlot === slot && styles.timeSlotTextSelected,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add-ons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Нэмэлтүүд (Сонголттой)</Text>
          {ADD_ONS.map((addOn) => (
            <TouchableOpacity
              key={addOn.id}
              style={styles.addOnRow}
              onPress={() => toggleAddOn(addOn.id)}
            >
              <View style={styles.checkbox}>
                {selectedAddOns.includes(addOn.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.addOnLabel}>{addOn.label}</Text>
              <Text style={styles.addOnPrice}>+${addOn.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Амьтны зан үйлийн тэмдэглэл (Сонголттой)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Амьтны таны тухай тусгай зааварчилгаа эсвэл тэмдэглэл..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <View style={styles.priceSummary}>
          <Text style={styles.totalLabel}>Нийт:</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={[styles.continueButton, !selectedTimeSlot && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedTimeSlot}
        >
          <Text style={styles.continueButtonText}>Үргэлжлүүлэх</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  durationButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  durationButtonSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  durationTextSelected: {
    color: '#FF6B35',
  },
  durationPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  durationPriceSelected: {
    color: '#FF6B35',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlotButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  timeSlotButtonSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  timeSlotTextSelected: {
    color: '#FF6B35',
  },
  addOnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  addOnLabel: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  addOnPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  continueButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

