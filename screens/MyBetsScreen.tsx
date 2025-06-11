import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { matches } from '../types/matches';

interface Bet {
  score: string;
  id: string;
  matchId: string;
  match: string;
  selectedOption: string;
  amount: string;
  paymentMethod: string;
  installments?: number;
  status: string;
  date?: string;
}

const MyBetsScreen = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  const generateFakeScore = () => {
    const team1 = Math.floor(Math.random() * 5);
    const team2 = Math.floor(Math.random() * 5);
    return `${team1} - ${team2}`;
  };

  const loadBets = async () => {
    try {
      const stored = await AsyncStorage.getItem('bets');
      const parsed = stored ? JSON.parse(stored) : [];

      const updated = parsed.map((b: Bet) => ({
        ...b,
        score: b.score || generateFakeScore(),
      }));

      setBets(updated.reverse());
      await AsyncStorage.setItem('bets', JSON.stringify(updated));
    } catch (err) {
      console.error('Erro ao carregar apostas:', err);
    }
  };

  useEffect(() => {
    loadBets();
  }, []);

  const clearBetsHistory = async () => {
    try {
      await AsyncStorage.removeItem('bets');
      setBets([]);
    } catch (error) {
      console.error('Erro ao limpar o histórico:', error);
    }
  };

  const getStatusBoxStyle = (status: string) => ({
    backgroundColor:
      status === 'Ganhou' ? '#34C759' : status === 'Perdeu' ? '#FF3B30' : '#666',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'center' as const,
    marginBottom: 8,
  });

  const getAmountStyle = (amount: number) => ({
    color: amount > 0 ? '#34C759' : amount < 0 ? '#FF3B30' : '#ccc',
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 4,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}
    >
      <Text style={styles.title}>Minhas Apostas</Text>

      <TouchableOpacity style={styles.clearButton} onPress={clearBetsHistory}>
        <Text style={styles.clearText}>Limpar histórico</Text>
      </TouchableOpacity>

      {bets.length === 0 && (
        <Text style={styles.empty}>Nenhuma aposta registrada.</Text>
      )}

      {bets.map((item) => {
        const match = matches.find((m) => m.id === item.matchId);
        const [team1Goals, team2Goals] = item.score.split(' - ').map(Number);
        const showOnLeft =
          (item.selectedOption === 'Vitória Time 1' && team1Goals > team2Goals) ||
          (item.selectedOption === 'Perdeu Time 1' && team1Goals < team2Goals);
        const showOnRight =
          (item.selectedOption === 'Vitória Time 2' && team2Goals > team1Goals) ||
          (item.selectedOption === 'Perdeu Time 2' && team2Goals < team1Goals);
        const showOnDraw = item.selectedOption === 'Empate' && team1Goals === team2Goals;

        return (
          <View key={item.id} style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>

            <View style={getStatusBoxStyle(item.status)}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.teamColumn}>
                {(item.selectedOption === 'Vitória Time 1' || item.selectedOption === 'Empate') && (
                  <Text style={getAmountStyle(Number(item.amount))}>
                    {Number(item.amount) === 0
                      ? ''
                      : `${Number(item.amount) > 0 ? '+' : ''}R$${Math.abs(Number(item.amount)).toFixed(2)}`}
                  </Text>
                )}
                {match && <Image source={match.logo1} style={styles.logo} />}
              </View>

              <View style={styles.scoreColumn}>
                <Text style={styles.score}>{item.score}</Text>
                <Text style={styles.league}>{match?.league || '-'}</Text>
              </View>

              <View style={styles.teamColumn}>
                {(item.selectedOption === 'Vitória Time 2' || item.selectedOption === 'Empate') && (
                  <Text style={getAmountStyle(Number(item.amount))}>
                    {Number(item.amount) === 0
                      ? ''
                      : `${Number(item.amount) > 0 ? '+' : ''}R$${Math.abs(Number(item.amount)).toFixed(2)}`}
                  </Text>
                )}
                {match && <Image source={match.logo2} style={styles.logo} />}
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MyBetsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 80 },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BebasNeue_400Regular',
    color: '#F7D269',
  },
  clearButton: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearText: { color: '#fff' },
  empty: { color: '#888', textAlign: 'center', marginTop: 40 },
  card: {
    backgroundColor: '#1c1c1e',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  date: { color: '#aaa', marginBottom: 4, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamColumn: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  scoreColumn: {
    alignItems: 'center',
    flex: 1,
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  league: {
    color: '#999',
    fontSize: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});