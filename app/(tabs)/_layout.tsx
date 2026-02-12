import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 70,
          paddingBottom: 6,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Нүүр',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: 'Үйлчилгээ',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="heart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Дэлгүүр',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.shopButton}>
              <IconSymbol size={24} name="cart.fill" color="#fff" />
            </View>
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.shopLabel, { color: '#FF6B35' }]}>Дэлгүүр</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Захиалга',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="clock.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="walker-details"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="confirm-booking"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="booking-details"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профайл',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shopButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -48,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shopLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -8,
  },
});
