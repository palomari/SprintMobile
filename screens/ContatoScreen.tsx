import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const ContatoScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Contato</Text>

        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="email" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <FontAwesome name="question" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>FAQ</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Chats</Text>

        <View style={styles.chatItem}>
          <Text style={styles.chatTitle}>Alteração de e-mail</Text>
          <Text style={styles.chatDate}>Mar 30, 2025 20:45</Text>
        </View>

        <View style={styles.chatItem}>
          <Text style={styles.chatTitle}>Atraso no depósito</Text>
          <Text style={styles.chatDate}>Apr 30, 2024 03:38</Text>
        </View>
      </ScrollView>

      <View style={styles.floatingWrapper}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('ChatBot')}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContatoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e' },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 20, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { fontSize: 16, color: '#ccc', marginTop: 30, marginBottom: 10 },
  option: {
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
  },
  icon: { marginRight: 12 },
  optionText: { fontSize: 16, color: '#fff' },
  chatItem: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatTitle: { fontSize: 14, color: '#fff', marginBottom: 4 },
  chatDate: { fontSize: 12, color: '#888' },
  floatingWrapper: {
    position: 'absolute',
    bottom: 32,
    right: 24,
  },
  floatingButton: {
    backgroundColor: '#34C759',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});