import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEntrar = () => {
  if (email && senha) {
    login(email);
    navigation.replace('Home');
  } else {
    alert('Preencha e-mail e senha');
  }
};

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#000' }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Image
          source={require('../../assets/ludari.png')}
          style={styles.logo}
          resizeMode="contain"
        />
<<<<<<< HEAD
        <Text style={styles.title}>LOGIN</Text>
=======
        <Text style={styles.title}>Login</Text>
>>>>>>> eb44e1fa93b025aa9fca562687043e51073c8252

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#aaa"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleEntrar}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.appleBtn}>
          <Image source={require('../../assets/apple.png')} style={styles.icon} />
          <Text style={styles.appleText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image source={require('../../assets/google.png')} style={styles.icon} />
          <Text style={styles.text}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image source={require('../../assets/microsoft.png')} style={styles.icon} />
          <Text style={styles.text}>Continue  Microsoft</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 250,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontFamily: 'BebasNeue_400Regular',
    color: '#F7D269',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#F7D269',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#555',
  },
  dividerText: {
    color: '#aaa',
    marginHorizontal: 12,
    fontSize: 14,
  },
  appleBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});