import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const IntroPrizesScreen = () => {
  const navigation = useNavigation<any>();

  const renderCircles = () => {
    const circles = [
      { color: '#74C476', scale: 2.0 },
      { color: '#84E086', scale: 1.6 },
      { color: '#93F095', scale: 1.2 },
      { color: '#98FD9A', scale: 0.8 },
    ];
    return circles.map((circle, i) => {
      const size = width * circle.scale;
      return (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: circle.color,
            top: height / 2 - size / 2,
            left: width / 2 - size / 2,
          }}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {renderCircles()}

      <View style={styles.content}>
        <Image source={require('../assets/prizes.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Prizes</Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace('IntroDeposit')}> 
        <Text style={styles.nextIcon}>➜</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroPrizesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74C476',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    top: height / 2 - 90,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
  fontSize: 60,
  fontFamily: 'Kavoon_400Regular',
  color: '#fff',
  marginTop: 20,
},
  nextButton: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  nextIcon: {
    fontSize: 28,
    color: '#3cbf55',
  },
});
