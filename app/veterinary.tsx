import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VeterinaryScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('Sun, 8');
  const [selectedTime, setSelectedTime] = useState('');

  const availableDays = ['Fri, 6', 'Sat, 7', 'Sun, 8', 'Mon, 9', 'Tue, 10'];
  const availableTimes = ['09.00', '15.00', '19.00'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Veterinary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Doctor Image */}
        <View style={styles.doctorImageContainer}>
          <View style={styles.doctorImage}>
            <Text style={styles.placeholderImage}>👩‍⚕️</Text>
          </View>
        </View>

        {/* Doctor Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.doctorName}>Dr. Anna Jhonason</Text>
          <Text style={styles.specialty}>Veterinary Behavioral</Text>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCardItem}>
              <Text style={styles.infoCardLabel}>Experience</Text>
              <Text style={styles.infoCardValue}>11 years</Text>
            </View>
            <View style={styles.infoCardItem}>
              <Text style={styles.infoCardLabel}>Price</Text>
              <Text style={styles.infoCardValue}>$250</Text>
            </View>
            <View style={styles.infoCardItem}>
              <Text style={styles.infoCardLabel}>Location</Text>
              <Text style={styles.infoCardValue}>2.5 Km</Text>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              Dr. Maria Naiis is a highly experienced veterinarian with 11 years of dedicated practice, showcasing a professional approach to pet care and behavioral therapy.
            </Text>
          </View>

          {/* Available Days */}
          <View style={styles.daysSection}>
            <View style={styles.daysHeader}>
              <Text style={styles.sectionTitle}>Available Days</Text>
              <View style={styles.calendarInfo}>
                <Text style={styles.calendarIcon}>📅</Text>
                <Text style={styles.calendarText}>October, 2023</Text>
              </View>
            </View>
            <View style={styles.daysContainer}>
              {availableDays.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.dayButtonSelected,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      selectedDay === day && styles.dayButtonTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Available Time */}
          <View style={styles.timeSection}>
            <Text style={styles.sectionTitle}>Available Time</Text>
            <View style={styles.timeContainer}>
              {availableTimes.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.timeButtonSelected,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeButtonText,
                      selectedTime === time && styles.timeButtonTextSelected,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationButtonText}>See Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  doctorImageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  doctorImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    fontSize: 80,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
    paddingTop: 40,
  },
  doctorName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCardItem: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  aboutSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  daysSection: {
    marginBottom: 24,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calendarIcon: {
    fontSize: 16,
  },
  calendarText: {
    fontSize: 14,
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B35',
    backgroundColor: '#fff',
  },
  dayButtonSelected: {
    backgroundColor: '#FF6B35',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  dayButtonTextSelected: {
    color: '#fff',
  },
  timeSection: {
    marginBottom: 24,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  timeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B35',
    backgroundColor: '#fff',
  },
  timeButtonSelected: {
    backgroundColor: '#FF6B35',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  timeButtonTextSelected: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFF5F2',
    gap: 8,
  },
  locationIcon: {
    fontSize: 18,
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  bookButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

