import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { Camera, Image as ImageIcon } from 'lucide-react-native';

export default function RegistrarScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Buraco');
  const [description, setDescription] = useState('');
  const { addReport } = useApp();

  const categories = ['Buraco', 'Desnível', 'Obstáculo', 'Rampa', 'Piso tátil', 'Faixa', 'Travessia', 'Calçada', 'Alagamento', 'Outro'];

  const handleRegister = () => {
    if (!title) {
      Alert.alert('Erro', 'Por favor, digite o título da ocorrência.');
      return;
    }

    addReport({
      title,
      category,
      description,
      severity: 'Alta',
      location: 'Recife Centro'
    });

    Alert.alert('Sucesso', 'Ocorrência cadastrada com sucesso!');
    setTitle('');
    setDescription('');
    navigation.navigate('Mapa');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.stepTitle}>O que você encontrou?</Text>

          <Text style={styles.label}>Título da Ocorrência</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Desnível na calçada"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Selecione a Categoria</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryOption, category === cat && styles.categoryOptionSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryOptionText, category === cat && styles.categoryOptionTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva a situação do local..."
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Adicione uma foto</Text>
          <View style={styles.photoRow}>
            <TouchableOpacity style={styles.photoButton}>
              <Camera color="#0B3D91" size={20} />
              <Text style={styles.photoButtonText}>Câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.photoButton}>
              <ImageIcon color="#0B3D91" size={20} />
              <Text style={styles.photoButtonText}>Galeria</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
            <Text style={styles.submitButtonText}>Próximo</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F5' },
  content: { padding: 16 },
  stepTitle: { fontSize: 18, fontWeight: '800', color: '#0B3D91', marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '700', color: '#1F2937', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#E8F0F5',
    borderWidth: 1,
    borderColor: '#D1DCE5',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
  },
  textArea: { height: 70, textAlignVertical: 'top' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  categoryOption: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#E8F0F5',
    borderWidth: 1,
    borderColor: '#D1DCE5',
  },
  categoryOptionSelected: { backgroundColor: '#0B3D91', borderColor: '#0B3D91' },
  categoryOptionText: { fontSize: 11, fontWeight: '700', color: '#0B3D91' },
  categoryOptionTextSelected: { color: '#FFFFFF' },
  photoRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#D1DCE5',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#E8F0F5',
  },
  photoButtonText: { fontSize: 12, fontWeight: '700', color: '#0B3D91' },
  submitButton: {
    backgroundColor: '#0B3D91',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});
