import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Platform, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timeout = setTimeout(() => {
      navigation.replace('LoginScreen'); // 👈 redireciona para o login
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.hintContainer, { opacity }]}>
        <Ionicons
          name={Platform.OS === 'web' ? 'move-outline' : 'chevron-down-outline'}
          size={36}
          color="#2E7D32"
        />
        <Text style={styles.hintText}>
          {Platform.OS === 'web' ? 'Role com o mouse' : 'Deslize para continuar'}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 40,
    textAlign: 'center',
  },
  hintContainer: {
    alignItems: 'center',
  },
  hintText: {
    marginTop: 8,
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
});
