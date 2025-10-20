import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const matches = [
  {
    id: '1',
    league: 'CBF',
    team1: require('../assets/fut1.png'),
    team2: require('../assets/fut2.png'),
    date: 'Dom 27/04 16:00',
    closeTime: '17:05:56',
  },
  {
    id: '2',
    league: 'CBF',
    team1: require('../assets/fut5.png'),
    team2: require('../assets/fut6.png'),
    date: 'Dom 27/04 12:30',
    closeTime: '10:25:37',
  },
  {
    id: '3',
    league: 'NBA',
    team1: require('../assets/nba1.png'),
    team2: require('../assets/nba2.png'),
    date: 'Seg 28/04 18:00',
    closeTime: '17:55:00',
  },
  {
    id: '4',
    league: 'NHL',
    team1: require('../assets/nhl1.png'),
    team2: require('../assets/nhl2.png'),
    date: 'Ter 29/04 20:00',
    closeTime: '19:45:00',
  },
  {
    id: '5',
    league: 'NBA',
    team1: require('../assets/nba2.png'),
    team2: require('../assets/nba1.png'),
    date: 'Seg 28/04 18:00',
    closeTime: '17:55:00',
  },
  {
    id: '6',
    league: 'NHL',
    team1: require('../assets/nhl2.png'),
    team2: require('../assets/nhl1.png'),
    date: 'Ter 29/04 20:00',
    closeTime: '19:45:00',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const leagues = ['CBF', 'NBA', 'NHL'];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Apostar</Text>

      {leagues.map((league) => (
        <View key={league}>
          <Text style={styles.sectionTitle}>{league}</Text>
          <View style={styles.gamesContainer}>
            {matches
              .filter((match) => match.league === league)
              .map((match) => (
                <View key={match.id} style={styles.matchCard}>
                  <Text style={styles.matchDate}>{match.date}</Text>
                  <View style={styles.teamsRow}>
                    <Image source={match.team1} style={styles.teamLogo} />
                    <Text style={{ color: '#fff', marginHorizontal: 4 }}>x</Text>
                    <Image source={match.team2} style={styles.teamLogo} />
                  </View>
                  <Text style={styles.betsClose}>
                    Apostas encerram ás {match.closeTime}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('NewBet', { match })}
                  >
                    <Text style={styles.betText}>Apostar</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 80 },
  header: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BebasNeue_400Regular',
    color: '#F7D269',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  matchCard: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  matchDate: { color: '#fff', fontSize: 14, marginBottom: 10 },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  teamLogo: { width: 40, height: 40, resizeMode: 'contain' },
  betsClose: { color: '#bbb', fontSize: 12, marginBottom: 10 },
  betButton: {
    backgroundColor: '#34C759',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  betText: { color: '#fff', fontWeight: 'bold' },
});