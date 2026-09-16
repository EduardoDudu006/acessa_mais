import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';

export default function CidadeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.heading}>Resumo da Cidade — Recife</Text>

        <View style={styles.statsGrid}>
          <Card style={[styles.statCard, { borderTopWidth: 4, borderTopColor: '#0B3D91' }]}>
            <Text style={styles.statNumber}>1.452</Text>
            <Text style={styles.statLabel}>Total de ocorrências</Text>
          </Card>

          <Card style={[styles.statCard, { borderTopWidth: 4, borderTopColor: '#00A86B' }]}>
            <Text style={[styles.statNumber, { color: '#00A86B' }]}>987</Text>
            <Text style={styles.statLabel}>Resolvidas</Text>
          </Card>

          <Card style={[styles.statCard, { borderTopWidth: 4, borderTopColor: '#FF7A00' }]}>
            <Text style={[styles.statNumber, { color: '#FF7A00' }]}>465</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.chartTitle}>Índice de Acessibilidade da Cidade</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>56<Text style={styles.scoreMax}>/100</Text></Text>
            <Text style={styles.scoreTag}>Regular</Text>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F5' },
  content: { padding: 16 },
  heading: { fontSize: 16, fontWeight: '800', color: '#0B3D91', marginBottom: 12 },
  statsGrid: { gap: 8 },
  statCard: { padding: 12 },
  statNumber: { fontSize: 22, fontWeight: '900', color: '#0B3D91' },
  statLabel: { fontSize: 11, color: '#617184', marginTop: 2 },
  chartTitle: { fontSize: 13, fontWeight: '800', color: '#0B3D91', marginBottom: 10 },
  scoreCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E8F0F5',
    borderRadius: 12,
  },
  scoreNumber: { fontSize: 28, fontWeight: '900', color: '#0B3D91' },
  scoreMax: { fontSize: 14, color: '#617184' },
  scoreTag: { fontSize: 12, fontWeight: '700', color: '#FF7A00', marginTop: 2 },
});
