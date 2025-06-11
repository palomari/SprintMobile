import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentOptionsScreen = ({ navigation, route }: any) => {
  const { match, amount, selectedOption } = route.params;
  const [selected, setSelected] = useState('');
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const parsedAmount = parseFloat(amount);
  const interestRate = 0.013;

  const generateInstallments = () => {
    return Array.from({ length: 6 }, (_, i) => {
      const n = i + 1;
      const total = parsedAmount * Math.pow(1 + interestRate, n);
      return {
        n,
        value: (total / n).toFixed(2),
      };
    });
  };

  const handleConfirm = () => {
    if (!selected) {
      Alert.alert('Selecione uma forma de pagamento.');
      return;
    }
    if (selected === 'credito' && selectedInstallment === null) {
      Alert.alert('Selecione o número de parcelas.');
      return;
    }

    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('PaymentSuccess', {
        match,
        amount,
        selectedOption,
        paymentMethod: selected,
        installments: selectedInstallment,
      });
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Como você gostaria de transferir R$ {amount}?</Text>

        <TouchableOpacity style={styles.radioRow} onPress={() => setSelected('debito')}>
          <View style={styles.radioCircle}>
            {selected === 'debito' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>Cartão de débito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioRow} onPress={() => setSelected('credito')}>
          <View style={styles.radioCircle}>
            {selected === 'credito' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>Cartão de crédito</Text>
        </TouchableOpacity>

        {selected === 'credito' && (
          <View style={styles.installmentBox}>
            <Text style={styles.subTitle}>Escolha o número de parcelas:</Text>
            {generateInstallments().map((item) => (
              <TouchableOpacity
                key={item.n}
                style={[
                  styles.installmentOption,
                  selectedInstallment === item.n && styles.installmentSelected,
                ]}
                onPress={() => setSelectedInstallment(item.n)}
              >
                <Text style={styles.installmentText}>{item.n}x de R$ {item.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {showAnimation && (
  <View style={styles.overlay}>
    <Image
      source={{ uri: 'https://i.gifer.com/7efs.gif' }} // link confiável de check animado
      style={{ width: 120, height: 120 }}
    />
    <Text style={styles.successText}>Transferência concluída!</Text>
  </View>
)}


      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar com {selected ? selected : '...'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentOptionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 100 },
  title: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 32 },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD700',
  },
  radioText: { fontSize: 16, color: '#fff' },
  installmentBox: { marginTop: 16 },
  subTitle: { fontSize: 14, color: '#fff', marginBottom: 10 },
  installmentOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2b2b2b',
    marginBottom: 10,
  },
  installmentSelected: {
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  installmentText: { color: '#fff', fontSize: 15 },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 24,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
},
successText: {
  color: '#34C759',
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 12,
},

});