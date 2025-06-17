import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function InvestmentScreen({ navigation, route }: any) {
  const { amount } = route.params;

  const investments = [
    { title: 'Renda Fixa', yield: '10.5% a.a.', bars: ['#F7D269', '#888888', '#888888'] },
    { title: 'FIIS', yield: '12% a.a.', bars: ['#F7D269', '#FACC50', '#888888'] },
    { title: 'CDB', yield: '15% a.a.', bars: ['#F7D269', '#FACC50', '#888888'] },
    { title: 'Ações', yield: '11% a.a.', bars: ['#F7D269', '#FACC50', '#FFD700'] },
  ];

  const handleBetPress = () => {
    navigation.replace('PaymentOptions', {
      amount,
    });
  };

  const BarIcon = ({ bars }: { bars: string[] }) => (
    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-end' }}>
      <View style={{ width: 3, height: 6, backgroundColor: bars[0], borderRadius: 1 }} />
      <View style={{ width: 3, height: 10, backgroundColor: bars[1], borderRadius: 1 }} />
      <View style={{ width: 3, height: 14, backgroundColor: bars[2], borderRadius: 1 }} />
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Investimentos</Text>

      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Valor a ser investido</Text>
        <Text style={styles.amountValue}>R$ {parseFloat(amount).toFixed(2)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Tipos de investimentos</Text>

      <View style={styles.grid}>
        {investments.map((inv, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{inv.title}</Text>
              <BarIcon bars={inv.bars} />
            </View>
            <Text style={styles.yieldText}>Rendimento aproximado:</Text>
            <Text style={styles.yieldValue}>{inv.yield}</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.investButton} onPress={handleBetPress}>
                <Text style={styles.investButtonText}>Investir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 80,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F7D269',
    marginBottom: 20,
    fontFamily: 'BebasNeue_400Regular',
    textAlign: 'center',
  },
  amountCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F7D269',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
    paddingLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: width / 2 - 24,
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  yieldText: {
    fontSize: 13,
    color: '#ccc',
  },
  yieldValue: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 12,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  investButton: {
    backgroundColor: '#F7D269',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  investButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
