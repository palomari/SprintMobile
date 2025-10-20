import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const PaymentSuccessScreen = ({ navigation, route }: any) => {
  const { match, amount, selectedOption, paymentMethod, installments } = route.params;

  const parsedAmount = parseFloat(amount);
  const isInvalidBet = !match || !match?.id || !selectedOption;

  const rate = 0.013;
  const totalAmount =
    paymentMethod === 'credito'
      ? parsedAmount * Math.pow(1 + rate, installments || 1)
      : parsedAmount;

  const getInstallmentDisplay = () => {
    if (!installments) return null;
    const total = parsedAmount * Math.pow(1 + rate, installments);
    const value = total / installments;
    return `${installments}x R$ ${value.toFixed(2)}`;
  };

  const saveBetToHistory = async () => {
    const statusOptions = ['Ganhou', 'Perdeu', 'Jogando'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const adjustedAmount =
      randomStatus === 'Ganhou'
        ? parsedAmount * 1.5
        : randomStatus === 'Perdeu'
        ? -parsedAmount
        : 0;

    const newBet = {
      id: uuid.v4(),
      matchId: match.id,
      match: match.date,
      selectedOption,
      amount: adjustedAmount.toFixed(2),
      paymentMethod,
      installments,
      date: new Date().toLocaleDateString('pt-BR'),
      status: randomStatus,
    };

    try {
      const stored = await AsyncStorage.getItem('bets');
      const parsed = stored ? JSON.parse(stored) : [];
      parsed.push(newBet);
      await AsyncStorage.setItem('bets', JSON.stringify(parsed));
    } catch (err) {
      console.error('Erro ao salvar aposta:', err);
    }
  };

  useEffect(() => {
    if (!isInvalidBet) {
      saveBetToHistory();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Comprovante</Text>

        <Text style={styles.amount}>R$ {totalAmount.toFixed(2)}</Text>

        {paymentMethod === 'credito' && installments && (
          <Text style={styles.installment}>{getInstallmentDisplay()}</Text>
        )}

        {!isInvalidBet && (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Jogo:</Text>
              <Text style={styles.value}>{match?.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Aposta:</Text>
              <Text style={styles.value}>{selectedOption}</Text>
            </View>
          </>
        )}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Forma:</Text>
          <Text style={styles.value}>
            {paymentMethod === 'debito' ? 'Cartão de débito' : 'Cartão de crédito'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{new Date().toLocaleDateString('pt-BR')}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Apostas')}>
          <Text style={styles.buttonText}>Voltar ao app</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  installment: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
  },
  value: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'right',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#2a2a2a',
    backgroundColor: '#1c1c1e',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
});