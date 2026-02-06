import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function ServiceScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Location Header */}
        <View style={styles.locationHeader}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>London, UK</Text>
        </View>

        {/* Promotional Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Lets Find Specialist Doctor for Your Pet!</Text>
          <View style={styles.bannerImage}>
            <Text style={styles.placeholderImage}>👨‍⚕️</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Search</Text>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Our Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>💉</Text>
              </View>
              <Text style={styles.serviceLabel}>Vaccinations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>🏥</Text>
              </View>
              <Text style={styles.serviceLabel}>Operations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>🧠</Text>
              </View>
              <Text style={styles.serviceLabel}>Behaviorals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>🦷</Text>
              </View>
              <Text style={styles.serviceLabel}>Dentistry</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Best Specialists Nearby */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Specialists Nearby</Text>
          <Link href="/veterinary" asChild>
            <TouchableOpacity style={styles.specialistCard}>
              <View style={styles.specialistImage}>
                <Text style={styles.placeholderImage}>👩‍⚕️</Text>
              </View>
              <View style={styles.specialistInfo}>
                <Text style={styles.specialistName}>Dr. Anna Johanson</Text>
                <Text style={styles.specialistSpecialty}>Veterinary Behavioral</Text>
                <View style={styles.specialistMeta}>
                  <View style={styles.rating}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                  <View style={styles.distance}>
                    <Text style={styles.locationPin}>📍</Text>
                    <Text style={styles.distanceText}>1 km</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.specialistCard}>
            <View style={styles.specialistImage}>
              <Text style={styles.placeholderImage}>👨‍⚕️</Text>
            </View>
            <View style={styles.specialistInfo}>
              <Text style={styles.specialistName}>Dr. Vernon Chwe</Text>
              <Text style={styles.specialistSpecialty}>Veterinary Surgery</Text>
              <View style={styles.specialistMeta}>
                <View style={styles.rating}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
                <View style={styles.distance}>
                  <Text style={styles.locationPin}>📍</Text>
                  <Text style={styles.distanceText}>1.5 km</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  locationIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  banner: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 12,
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
    marginBottom: 30,
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceEmoji: {
    fontSize: 32,
  },
  serviceLabel: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    textAlign: 'center',
  },
  specialistCard: {
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
  specialistImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  specialistInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  specialistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  specialistSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  specialistMeta: {
    flexDirection: 'row',
    gap: 16,
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
  placeholderImage: {
    fontSize: 40,
  },
});

