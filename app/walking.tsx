import { Walker } from '@/types/booking';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalkingScreen() {
  const router = useRouter();

  const walkers: Walker[] = [
    {
      id: 'walker-1',
      name: 'Mike Johnson',
      rating: 4.9,
      baseArea: 'Downtown',
      price30: 25,
      price60: 45,
      availableToday: true,
    },
    {
      id: 'walker-2',
      name: 'Emma Wilson',
      rating: 4.8,
      baseArea: 'Westside',
      price30: 22,
      price60: 40,
      availableToday: true,
    },
    {
      id: 'walker-3',
      name: 'David Chen',
      rating: 5.0,
      baseArea: 'Central Park',
      price30: 30,
      price60: 55,
      availableToday: false,
    },
    {
      id: 'walker-4',
      name: 'Sarah Martinez',
      rating: 4.7,
      baseArea: 'Eastside',
      price30: 20,
      price60: 35,
      availableToday: true,
    },
    {
      id: 'walker-5',
      name: 'James Brown',
      rating: 4.9,
      baseArea: 'Northside',
      price30: 28,
      price60: 50,
      availableToday: true,
    },
  ];

  const handleBookWalker = (walker: Walker) => {
    router.push({
      pathname: '/(tabs)/walker-details',
      params: {
        walkerId: walker.id,
        walkerName: walker.name,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Walking</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Search walkers...</Text>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Available Walkers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Walkers</Text>
          {walkers.map((walker) => (
            <View key={walker.id} style={styles.walkerCard}>
              <View style={styles.walkerImage}>
                <Text style={styles.walkerEmoji}>👤</Text>
              </View>
              <View style={styles.walkerInfo}>
                <View style={styles.walkerHeader}>
                  <Text style={styles.walkerName}>{walker.name}</Text>
                  {walker.availableToday && (
                    <View style={styles.availableBadge}>
                      <Text style={styles.availableText}>Available today</Text>
                    </View>
                  )}
                </View>
                <View style={styles.walkerMeta}>
                  <View style={styles.rating}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.ratingText}>{walker.rating}</Text>
                  </View>
                  <Text style={styles.areaText}>📍 {walker.baseArea}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>${walker.price30}/30min</Text>
                  <Text style={styles.priceText}>${walker.price60}/60min</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookWalker(walker)}
                >
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  walkerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  walkerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  walkerEmoji: {
    fontSize: 40,
  },
  walkerInfo: {
    flex: 1,
  },
  walkerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  walkerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availableText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4CAF50',
  },
  walkerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  areaText: {
    fontSize: 14,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  bookButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

