import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewBetScreen from '../screens/NewBetScreen';
import MyBetsScreen from '../screens/MyBetsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContatoScreen from '../screens/ContatoScreen';
import ChatBotScreen from '../screens/ChatBotScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="NewBet" component={NewBetScreen} />
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
        tabBarActiveTintColor: '#34C759', // verde
        tabBarInactiveTintColor: '#ccc',   // cinza claro
        tabBarStyle: {
          backgroundColor: '#2b2b2b', // fundo grafite
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'MinhasApostas') iconName = 'list';
          if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="MinhasApostas" component={MyBetsScreen} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}
