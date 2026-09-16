import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle } from 'lucide-react-native';

export default function ContribuicoesScreen() {
  const { reports, userPoints } = useApp();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>EL</Text>
          </View>
          <Text style={styles.userName}>Eduardo Luz</Text>
          <Text style={styles.userRole}>Nível: Colaborador</Text>

          <View style={styles.pointsBadge}>
            <Award color="#FFFFFF" size={16} />
            <Text style={styles.pointsText}>{userPoints} pontos</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Minhas Contribuições</Text>

        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <CheckCircle color="#00A86B" size={18} />
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemInfo}>{item.category} • Confirmado por {item.confirmations} pessoas</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F5' },
  content: { padding: 16, flex: 1 },
  profileCard: { alignItems: 'center', backgroundColor: '#0B3D91', padding: 20 },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: { fontWeight: '800', color: '#0B3D91', fontSize: 16 },
  userName: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  userRole: { color: '#E8F0F5', fontSize: 11, marginTop: 2 },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FF7A00',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginTop: 10,
  },
  pointsText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0B3D91', marginVertical: 12 },
  itemCard: { marginBottom: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: 13, fontWeight: '800', color: '#0B3D91' },
  itemInfo: { fontSize: 11, color: '#617184', marginTop: 2 },
});
