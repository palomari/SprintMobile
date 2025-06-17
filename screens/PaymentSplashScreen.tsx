import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PaymentSplashScreen = ({ navigation, route }: any) => {
  const { match, amount, selectedOption } = route.params;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('ComparePage', {
        match,
        amount,
        selectedOption,
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/xp.jpg')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default PaymentSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
});
