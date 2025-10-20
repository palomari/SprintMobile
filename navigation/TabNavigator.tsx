import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewBetScreen from '../screens/NewBetScreen';
import MyBetsScreen from '../screens/MyBetsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContatoScreen from '../screens/ContatoScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import PaymentSplashScreen from '../screens/PaymentSplashScreen';
import ComparePage from '../screens/ComparePage';
import InvestmentScreen from '../screens/InvestmentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import PaymentOptionsScreen from '../screens/PaymentOptionsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const baseTabBarStyle = {
  backgroundColor: '#2b2b2b',
  borderTopWidth: 0,
  height: 60,
};

const hiddenTabBarStyle = {
  display: 'none' as const,
  // Android teimoso? Descomente:
  // position: 'absolute' as const,
  // height: 0,
};

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="HomeMain"   
  >
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="NewBet" component={NewBetScreen} />
    <Stack.Screen name="PaymentSplash" component={PaymentSplashScreen} />
    <Stack.Screen name="ComparePage" component={ComparePage} />
    <Stack.Screen name="Investment" component={InvestmentScreen} />
    <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
    <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="Contato" component={ContatoScreen} />
    <Stack.Screen name="ChatBot" component={ChatBotScreen} />
  </Stack.Navigator>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#34C759',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: baseTabBarStyle,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Apostas') iconName = 'list';
          if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => {
          const rn = getFocusedRouteNameFromRoute(route);
          const show = !rn || rn === 'HomeMain';
          return { tabBarStyle: show ? baseTabBarStyle : hiddenTabBarStyle };
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('Home', { screen: 'HomeMain' });
          },
        })}
      />
      <Tab.Screen name="Apostas" component={MyBetsScreen} />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={({ route }) => {
          const rn = getFocusedRouteNameFromRoute(route);
          const show = !rn || rn === 'ProfileMain';
          return { tabBarStyle: show ? baseTabBarStyle : hiddenTabBarStyle };
        }}
      />
    </Tab.Navigator>
  );
}