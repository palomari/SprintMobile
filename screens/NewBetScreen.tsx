import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

const NewBetScreen = ({ route, navigation }: any) => {
  const { match } = route.params || {};
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState('');

  const handleConfirmBet = () => {
    if (!selectedOption || !amount) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    navigation.navigate('PaymentSplash', {
      match,
      amount,
      selectedOption,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Apostar no Jogo</Text>

      {match && (
        <View style={styles.matchCard}>
          <Text style={styles.matchDate}>{match.date}</Text>
          <View style={styles.teamsRow}>
            <Image source={match.team1} style={styles.logo} />
            <Text style={styles.vsText}>x</Text>
            <Image source={match.team2} style={styles.logo} />
          </View>
          <Text style={styles.closeTime}>Fechamento: {match.closeTime}</Text>
        </View>
      )}

      <Text style={styles.label}>Selecione sua aposta:</Text>
      <View style={styles.choiceRow}>
        <TouchableOpacity
          style={[
            styles.choiceCard,
            selectedOption === 'Vitória Time 1' && styles.choiceSelected,
          ]}
          onPress={() => setSelectedOption('Vitória Time 1')}
        >
          <Image source={match.team1} style={styles.choiceLogo} />
          <Text style={styles.choiceText}>Time 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.choiceCard,
            selectedOption === 'Empate' && styles.choiceSelected,
          ]}
          onPress={() => setSelectedOption('Empate')}
        >
          <Image source={require('../assets/draw.png')} style={styles.choiceLogo} />
          <Text style={styles.choiceText}>Empate</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.choiceCard,
            selectedOption === 'Vitória Time 2' && styles.choiceSelected,
          ]}
          onPress={() => setSelectedOption('Vitória Time 2')}
        >
          <Image source={match.team2} style={styles.choiceLogo} />
          <Text style={styles.choiceText}>Time 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Valor da Aposta (R$):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 50"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBet}>
        <Text style={styles.confirmText}>Confirmar Aposta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewBetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F7D269',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'BebasNeue_400Regular',
  },
  matchCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  matchDate: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  closeTime: {
    color: '#999',
    fontSize: 12,
    marginTop: 10,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginHorizontal: 12,
  },
  vsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  choiceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  choiceCard: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  choiceSelected: {
    borderColor: '#34C759',
    backgroundColor: '#2a2a2a',
  },
  choiceLogo: {
  width: 36,
  height: 36,
  resizeMode: 'contain',
  marginBottom: 6,
},
  choiceText: {
    color: '#fff',
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    fontSize: 15,
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
