import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity,
  ScrollView, View, Platform, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser, mapFirebaseError } from '../../services/users.service';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(''); // formato: AAAA-MM-DD
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  function isValidEmail(v: string) {
    return /^\S+@\S+\.\S+$/.test(v);
  }
  function onlyDigits(v: string) {
    return v.replace(/\D/g, '');
  }
  function isAdult(isoDate: string) {
    const parts = isoDate.split('-').map(Number);
    if (parts.length !== 3) return false;
    const [y, m, d] = parts;
    const dob = new Date(y, (m || 1) - 1, d || 1);
    if (Number.isNaN(dob.getTime())) return false;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasntHadBirthdayThisYear =
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
    if (hasntHadBirthdayThisYear) age--;
    return age >= 18;
  }

  async function handleRegister() {
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim() || !email.trim() || !senha || !cpf.trim() || !birthDate.trim()) {
      setErrorMsg('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setErrorMsg('Informe um e-mail válido.');
      return;
    }
    if (senha.length < 6) {
      setErrorMsg('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirm) {
      setErrorMsg('As senhas não conferem.');
      return;
    }

    const cpfDigits = onlyDigits(cpf);
    if (cpfDigits.length !== 11) {
      setErrorMsg('CPF inválido. Use 11 dígitos.');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate.trim())) {
      setErrorMsg('Data de nascimento no formato AAAA-MM-DD.');
      return;
    }
    if (!isAdult(birthDate.trim())) {
      setErrorMsg('É necessário ter 18 anos ou mais para criar conta.');
      return;
    }

    try {
      setLoading(true);
      await registerUser(name.trim(), email.trim(), senha, {
        cpf: cpfDigits,
        birthDate: birthDate.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });

      setSuccessMsg('Conta criada com sucesso!');
      setTimeout(() => {
        navigation.replace('Home'); 
      }, 600);
    } catch (e: any) {
      const msg = mapFirebaseError(e?.code, e?.message || 'Não foi possível concluir o cadastro.');
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.container}>
      {/* Header com Voltar */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Criar Conta</Text>
        <View style={{ width: 72 }} />
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TextInput style={s.input} placeholder="Nome completo*" placeholderTextColor="#aaa" value={name} onChangeText={setName}/>
        <TextInput style={s.input} placeholder="CPF (somente números)*" placeholderTextColor="#aaa" value={cpf} onChangeText={setCpf} keyboardType="numeric"/>
        <TextInput style={s.input} placeholder="Data de nascimento (AAAA-MM-DD)*" placeholderTextColor="#aaa" value={birthDate} onChangeText={setBirthDate}/>
        <TextInput style={s.input} placeholder="Telefone" placeholderTextColor="#aaa" value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
        <TextInput style={s.input} placeholder="Endereço" placeholderTextColor="#aaa" value={address} onChangeText={setAddress}/>

        <TextInput style={s.input} placeholder="E-mail*" placeholderTextColor="#aaa" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
        <TextInput style={s.input} placeholder="Senha*" placeholderTextColor="#aaa" secureTextEntry value={senha} onChangeText={setSenha}/>
        <TextInput style={s.input} placeholder="Confirmar senha*" placeholderTextColor="#aaa" secureTextEntry value={confirm} onChangeText={setConfirm}/>

        {/* feedback abaixo do botão */}
        {errorMsg ? <Text style={s.errorText}>{errorMsg}</Text> : null}
        {successMsg ? <Text style={s.successText}>{successMsg}</Text> : null}

        <TouchableOpacity style={[s.btn, loading && { opacity: 0.7 }]} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={s.btnTxt}>Criar conta</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#000' },
  header: {
    flexDirection:'row', alignItems:'center', justifyContent:'space-between',
    paddingHorizontal:16, paddingTop:12, paddingBottom:4,
  },
  backBtn:{ paddingVertical:8, paddingHorizontal:8, borderRadius:10 },
  backTxt:{ color:'#F7D269', fontWeight:'700', fontSize:16 },
  title:{
    color:'#F7D269', fontSize:28, fontWeight:'700', textAlign:'center',
    fontFamily: Platform.OS === 'web' ? undefined : 'BebasNeue_400Regular',
  },
  scroll:{ flexGrow:1, justifyContent:'center', paddingHorizontal:24, paddingVertical:20 },
  input:{ backgroundColor:'#1c1c1c', color:'#fff', padding:16, borderRadius:12, marginBottom:14, fontSize:16 },
  btn:{ backgroundColor:'#F7D269', padding:16, borderRadius:12, alignItems:'center', marginTop:10 },
  btnTxt:{ color:'#000', fontWeight:'700', fontSize:16 },
  errorText:{ color:'#ff7070', marginTop:4, marginBottom:8, textAlign:'center' },
  successText:{ color:'#7ee2a8', marginTop:4, marginBottom:8, textAlign:'center' },
});
