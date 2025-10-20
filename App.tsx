import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { useFonts, Kavoon_400Regular } from '@expo-google-fonts/kavoon';
import { ActivityIndicator, View } from 'react-native';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import RootNavigator from './navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#34C759" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
