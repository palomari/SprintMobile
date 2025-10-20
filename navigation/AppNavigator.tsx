import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../context/AuthContext';

// Screens
import IntroSportsScreen from '../screens/IntroSportsScreen';
import IntroPrizesScreen from '../screens/IntroPrizesScreen';
import IntroDepositScreen from '../screens/IntroDepositScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NewBetScreen from '../screens/NewBetScreen';
import PaymentSplashScreen from '../screens/PaymentSplashScreen';
import PaymentOptionsScreen from '../screens/PaymentOptionsScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import MyBetsScreen from '../screens/MyBetsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContatoScreen from '../screens/ContatoScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import TabNavigator from './TabNavigator';
import { SplashScreen } from '../screens/SplashScreen';
import ComparePage from '../screens/ComparePage';
import InvestmentScreen from '../screens/InvestmentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setFirstLaunch(true);
        } else {
          setFirstLaunch(false);
        }
      } catch (err) {
        console.error('Erro ao verificar AsyncStorage:', err);
        setFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (firstLaunch === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {firstLaunch ? (
          // primeira vez
          <>
            <Stack.Screen name="IntroSports" component={IntroSportsScreen} />
            <Stack.Screen name="IntroPrizes" component={IntroPrizesScreen} />
            <Stack.Screen name="IntroDeposit" component={IntroDepositScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        ) : !user ? (
          // não logado (depois da primeira vez)
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        ) : (
          // logado
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewBet" component={NewBetScreen} />
            <Stack.Screen name="ComparePage" component={ComparePage} />
            <Stack.Screen name="Investment" component={InvestmentScreen} />
            <Stack.Screen name="PaymentSplash" component={PaymentSplashScreen} />
            <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
            <Stack.Screen name="MinhasApostas" component={MyBetsScreen} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
            <Stack.Screen name="Contato" component={ContatoScreen} />
            <Stack.Screen name="ChatBot" component={ChatBotScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
