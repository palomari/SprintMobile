import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';

import IntroSportsScreen from '../screens/IntroSportsScreen';
import IntroPrizesScreen from '../screens/IntroPrizesScreen';
import IntroDepositScreen from '../screens/IntroDepositScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="IntroSports" component={IntroSportsScreen} />
            <Stack.Screen name="IntroPrizes" component={IntroPrizesScreen} />
            <Stack.Screen name="IntroDeposit" component={IntroDepositScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewBet" component={NewBetScreen} />
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
