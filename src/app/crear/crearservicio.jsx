import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/authContext';

export default function CrearServicio() {
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!servicio || !descripcion || !precio || !ubicacion) {
      Alert.alert('Faltan datos', 'Completá todos los campos.');
      return;
    }

    const nuevoServicio = {
      servicio,
      descripcion,
      precio: Number(precio),
      ubicacion,
      rating: Math.floor(Math.random() * 5) + 1,
      usuarioId: user?.id,
    };

    try {
      await fetch('https://683644b2664e72d28e404ea3.mockapi.io/Pets/Servicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoServicio),
      });

      Alert.alert('Servicio creado exitosamente');
      router.replace('/servicios');
    } catch (error) {
      console.error('Error al crear el servicio:', error);
      Alert.alert('Error', 'No se pudo crear el servicio.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Crear Servicio</Text>

      <Text style={styles.label}>Tipo de Servicio</Text>
      <TextInput
        style={styles.input}
        value={servicio}
        onChangeText={setServicio}
        placeholder="Ej. Paseador o Veterinaria"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Describe brevemente tu servicio"
        multiline
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Ej. 1500"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        value={ubicacion}
        onChangeText={setUbicacion}
        placeholder="Ej. Palermo, CABA"
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryText}>Crear Servicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9fafb',
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 16,
    color: '#111',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});