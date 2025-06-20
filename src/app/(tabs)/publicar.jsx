import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image, StyleSheet, Alert,Platform } from 'react-native';
import { useMascotas } from '../../context/mascotasContext';
import { pickImageFromGallery, takePhotoFromCamera} from '../../utils/image.picker';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';


export default function Publicar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué querés publicar?</Text>

      <Text style={styles.description}>
        Elegí si querés publicar una mascota en adopción o un servicio para mascotas.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/crear/crearmascota')}
      >
        <Text style={styles.buttonText}>🐾 Publicar una mascota</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/crear/crearservicio')}
      >
        <Text style={styles.buttonText}>🩺 Crear un servicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#444',
  },
  button: {
    backgroundColor: '#4f8cff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
   pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 15,
  overflow: 'hidden',
},
 picker: {
    marginBottom: 15,
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});