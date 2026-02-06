import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>S</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Hello, Sarah</Text>
              <Text style={styles.subGreeting}>Good Morning!</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>search</Text>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Featured Section */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>In Love With Pets?</Text>
            <Text style={styles.featuredSubtitle}>Get all what you need for them</Text>
          </View>
          <View style={styles.featuredImage}>
            <Text style={styles.placeholderImage}>🐕</Text>
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryGrid}>
            <Link href="/veterinary" asChild>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>🩺</Text>
                </View>
                <Text style={styles.categoryLabel}>Veterinary</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/grooming" asChild>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>✂️</Text>
                </View>
                <Text style={styles.categoryLabel}>Grooming</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryEmoji}>🛒</Text>
              </View>
              <Text style={styles.categoryLabel}>Pet Store</Text>
            </TouchableOpacity>
            <Link href="/training" asChild>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>🎓</Text>
                </View>
                <Text style={styles.categoryLabel}>Training</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Event Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event</Text>
          <View style={styles.eventCard}>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>Find and Join in Special Events For Your Pets!</Text>
              <TouchableOpacity style={styles.eventButton}>
                <Text style={styles.eventButtonText}>See More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.eventImage}>
              <Text style={styles.placeholderImage}>🎉</Text>
            </View>
          </View>
        </View>

        {/* Community Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community</Text>
          <View style={styles.communityCard}>
            <View style={styles.communityContent}>
              <Text style={styles.communityTitle}>Connect and share with communities!</Text>
            </View>
            <View style={styles.communityImage}>
              <Text style={styles.placeholderImage}>👥</Text>
            </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6F4FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 24,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#FF6B35',
  },
  searchIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
  featuredCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredContent: {
    flex: 1,
    marginRight: 12,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#FF6B35',
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
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
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventContent: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
  },
  eventButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  eventButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communityContent: {
    flex: 1,
    marginRight: 12,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  communityImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    fontSize: 40,
  },
});
