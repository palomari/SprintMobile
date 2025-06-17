import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ComparePage({ navigation, route }: any) {
  const { match, amount, selectedOption } = route.params;

  const fadeInLeft = useRef(new Animated.Value(0)).current;
  const fadeInRight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInLeft, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInRight, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBetPress = () => {
    navigation.replace('PaymentOptions', {
      match,
      amount,
      selectedOption,
    });
  };

  return (
    <View style={styles.container}>
      {/* Verde - Investir */}
      <Animated.View style={[styles.leftContainer, { opacity: fadeInLeft }]}>
        <View style={styles.greenCircles} />
        <View style={styles.topSection}>
          <Text style={styles.titleInvest}>Investir</Text>
          <Text style={styles.subtitleInvest}>Construa seu futuro com retornos reais e consistentes.</Text>
        </View>
        <Image source={require('../assets/investir.png')} style={styles.imageLeft} resizeMode="contain" />
        <Text style={styles.highlightText}>Rendimento estimado de + 12% ao ano.</Text>
        <View style={styles.footerButton}>
          <TouchableOpacity style={styles.investButton} onPress={() => navigation.navigate('Investment', { amount })}>
            <Text style={styles.investButtonText}>Investir</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Preto - Apostar */}
      <Animated.View style={[styles.rightContainer, { opacity: fadeInRight }]}>
        {/* <View style={styles.darkCircles} /> */}
        <View style={styles.topSection}>
          <Text style={styles.titleBet}>Apostar</Text>
          <Text style={styles.subtitleBet}>Ganhos rápidos mas sem garantia. E se perder?</Text>
        </View>
        <Image source={require('../assets/apostar.png')} style={styles.imageRight} resizeMode="contain" />
        <View style={styles.footerButton}>
          <TouchableOpacity
            style={styles.betButton}
            onPress={handleBetPress}
          >
            <Text style={styles.betButtonText}>Apostar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    backgroundColor: '#74C476',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greenCircles: {
    position: 'absolute',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: '#93F095',
    top: -width / 2,
    left: -width / 2,
    zIndex: -1,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  darkCircles: {
    position: 'absolute',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: '#333333',
    top: -width / 2,
    left: width * 0.25,
    zIndex: -1,
  },
  topSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  titleInvest: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitleInvest: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  highlightText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  titleBet: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitleBet: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  imageLeft: {
    width: 180,
    height: 180,
    marginTop: -40,
  },
  imageRight: {
    width: 180,
    height: 180,
    marginTop: -40,
  },
  footerButton: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  investButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  investButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  betButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  betButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
