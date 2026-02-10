import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthGuard } from '@/components/AuthGuard';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/store/AuthStore';
import { BookingsProvider } from '@/store/BookingsStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <BookingsProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthGuard>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="veterinary" options={{ headerShown: false }} />
              <Stack.Screen name="grooming" options={{ headerShown: false }} />
              <Stack.Screen name="training" options={{ headerShown: false }} />
              <Stack.Screen name="walking" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </AuthGuard>
        </ThemeProvider>
      </BookingsProvider>
    </AuthProvider>
  );
}
