import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser, mapFirebaseError } from '../../services/users.service';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEntrar = async () => {
    setErrorMsg('');

    if (!email || !senha) {
      setErrorMsg('Preencha e-mail e senha.');
      return;
    }

    try {
      setLoading(true);
      await loginUser(email.trim(), senha);
    } catch (e: any) {
      const msg = mapFirebaseError(e?.code, e?.message || 'Não foi possível autenticar.');
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('Register');
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
        <Text style={styles.title}>LOGIN</Text>

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

        {/* mensagem de erro (nova) */}
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.7 }]}
          onPress={handleEntrar}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={styles.loginText}>Entrar</Text>
          }
        </TouchableOpacity>

        {/* link para cadastro */}
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ color: '#aaa', marginBottom: 8 }}>Não tem conta?</Text>
          <TouchableOpacity style={styles.createBtn} onPress={handleGoToRegister}>
            <Text style={styles.createText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 250,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'BebasNeue_400Regular',
    color: '#F7D269',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#F7D269',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createBtn: {
    borderColor: '#F7D269',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  createText: {
    color: '#F7D269',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#ff7070',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});
