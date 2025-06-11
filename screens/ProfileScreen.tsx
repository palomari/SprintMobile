import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.profileCard}>
        <Image
          source={require('../assets/user.png')}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>Usuario</Text>
          <Text style={styles.activity}>Ultima Atividade:</Text>
          <Text style={styles.activityDate}>Abril 24, 2025 as 08:25 p.m.</Text>
        </View>
      </View>

      <View style={styles.optionBox}>
        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>Idioma</Text>
          <Text style={styles.optionValue}>Português</Text>
        </View>

        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>Notificação</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#666', true: '#34C759' }}
            thumbColor={notificationsEnabled ? '#fff' : '#ccc'}
          />
        </View>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate('Contato')}
        >
          <Text style={styles.optionLabel}>Contato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={logout}
        >
          <Text style={styles.optionLabel}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BebasNeue_400Regular',
    color: '#F7D269',
  },
  profileCard: {
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#34C759',
    marginRight: 16,
  },
  profileInfo: { flex: 1 },
  username: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  activity: { fontSize: 12, color: '#aaa', marginTop: 4 },
  activityDate: { fontSize: 12, color: '#ccc' },
  optionBox: {
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    padding: 12,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3a3a3c',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  optionLabel: { fontSize: 16, color: '#fff' },
  optionValue: { fontSize: 16, color: '#ccc' },
});
