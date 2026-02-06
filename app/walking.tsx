import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WalkingScreen() {
  const router = useRouter();

  const walkers = [
    {
      id: 1,
      name: 'Mike Johnson',
      experience: '5 years',
      rating: 4.9,
      reviews: 128,
      distance: '0.8 km',
      price: '$25/hour',
      emoji: '👨',
    },
    {
      id: 2,
      name: 'Emma Wilson',
      experience: '3 years',
      rating: 4.8,
      reviews: 95,
      distance: '1.2 km',
      price: '$22/hour',
      emoji: '👩',
    },
    {
      id: 3,
      name: 'David Chen',
      experience: '7 years',
      rating: 5.0,
      reviews: 203,
      distance: '0.5 km',
      price: '$30/hour',
      emoji: '👨',
    },
    {
      id: 4,
      name: 'Sarah Martinez',
      experience: '4 years',
      rating: 4.7,
      reviews: 87,
      distance: '1.5 km',
      price: '$20/hour',
      emoji: '👩',
    },
    {
      id: 5,
      name: 'James Brown',
      experience: '6 years',
      rating: 4.9,
      reviews: 156,
      distance: '1.0 km',
      price: '$28/hour',
      emoji: '👨',
    },
  ];

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
            <TouchableOpacity key={walker.id} style={styles.walkerCard}>
              <View style={styles.walkerImage}>
                <Text style={styles.walkerEmoji}>{walker.emoji}</Text>
              </View>
              <View style={styles.walkerInfo}>
                <Text style={styles.walkerName}>{walker.name}</Text>
                <Text style={styles.walkerExperience}>{walker.experience} experience</Text>
                <View style={styles.walkerMeta}>
                  <View style={styles.rating}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.ratingText}>
                      {walker.rating} ({walker.reviews})
                    </Text>
                  </View>
                  <View style={styles.distance}>
                    <Text style={styles.locationPin}>📍</Text>
                    <Text style={styles.distanceText}>{walker.distance}</Text>
                  </View>
                </View>
                <Text style={styles.walkerPrice}>{walker.price}</Text>
              </View>
            </TouchableOpacity>
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
    justifyContent: 'center',
  },
  walkerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  walkerExperience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  walkerMeta: {
    flexDirection: 'row',
    gap: 16,
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
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationPin: {
    fontSize: 14,
  },
  distanceText: {
    fontSize: 14,
    color: '#FF6B35',
  },
  walkerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 4,
  },
});

