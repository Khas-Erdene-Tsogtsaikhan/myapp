import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroomingScreen() {
  const router = useRouter();

  const services = [
    { id: 1, name: 'Угаах & Хатаах', emoji: '🚿' },
    { id: 2, name: 'Үс тайрах', emoji: '✂️' },
    { id: 3, name: 'Хумс тайрах', emoji: '💅' },
    { id: 4, name: 'Чих цэвэрлэх', emoji: '👂' },
    { id: 5, name: 'Шүд угаах', emoji: '🦷' },
    { id: 6, name: 'Блох & Бээс', emoji: '🐛' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Хооллолт</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerDiscount}>60% ХЯМДРУУЛСАН</Text>
            <Text style={styles.bannerSubtext}>Үс болон спа эмчилгээнд</Text>
          </View>
          <View style={styles.bannerImage}>
            <Text style={styles.placeholderImage}>🐕</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Хайх</Text>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Our Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Манай үйлчилгээнүүд</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Бүгдийг харах</Text>
            </TouchableOpacity>
          </View>

          {/* Services Grid */}
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceImage}>
                  <Text style={styles.serviceEmoji}>{service.emoji}</Text>
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  },
  banner: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
  },
  bannerDiscount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bannerSubtext: {
    fontSize: 16,
    color: '#fff',
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  searchIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B35',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceEmoji: {
    fontSize: 50,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  placeholderImage: {
    fontSize: 40,
  },
});

