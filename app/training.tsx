import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrainingScreen() {
  const router = useRouter();

  const courses = [
    {
      id: 1,
      title: 'Obedience Courses',
      instructor: 'By Jhon Smith',
      rating: 4.9,
      reviews: 335,
      emoji: '🐕',
    },
    {
      id: 2,
      title: 'Specialty Classes & Workshops',
      instructor: 'By Duke Fuzzington',
      rating: 5.0,
      reviews: 500,
      emoji: '🏃',
    },
    {
      id: 3,
      title: 'Puppy Kindergarten and Playgroups',
      instructor: 'By Sir Fluffington',
      rating: 5.0,
      reviews: 500,
      emoji: '🐶',
    },
    {
      id: 4,
      title: 'Canine Good Citizen Test',
      instructor: 'By Baron Fuzzypaws',
      rating: 4.8,
      reviews: 220,
      emoji: '🏆',
    },
    {
      id: 5,
      title: 'Therapy Dogs',
      instructor: 'By Duke Fuzzington',
      rating: 5.0,
      reviews: 500,
      emoji: '❤️',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Training</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={styles.courseThumbnail}>
              <Text style={styles.courseEmoji}>{course.emoji}</Text>
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
              <View style={styles.courseRating}>
                <Text style={styles.star}>⭐</Text>
                <Text style={styles.ratingText}>
                  {course.rating} ({course.reviews})
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  courseThumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  courseEmoji: {
    fontSize: 50,
  },
  playButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#FF6B35',
    marginLeft: 2,
  },
  courseInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
});

