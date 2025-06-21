import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import { useMascotas } from '../../context/mascotasContext';
import { Picker } from '@react-native-picker/picker';
import { pickImageFromGallery, takePhotoFromCamera} from '../../utils/image.picker';
import { useRouter } from 'expo-router';

export default function PublicarMascota() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState("");

  const { publicarMascota } = useMascotas();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !type  || !age || !description || !location || !photo || !gender) {
      Alert.alert("Faltan datos", "Por favor completá todos los campos.");
      return;
    }

    await publicarMascota({
      name,
      type,
      breed,
      age,
      description,
      location,
      photo,
      gender : gender,
    });

    Alert.alert( "Mascota publicada correctamente.");
    router.replace("/mascotas");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Publicar Mascota</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ej. pupi" />

    
 <Text style={styles.label}>Tipo</Text>
      <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} style={styles.picker}>
        <Picker.Item label="Seleccionar tipo" value="" />
        <Picker.Item label="Perro" value="perro" />
        <Picker.Item label="Gato" value="gato" />
        <Picker.Item label="Otro" value="otro" />
      </Picker>

      <Text style={styles.label}>Género</Text>
      <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
        <Picker.Item label="Seleccionar género" value="" />
        <Picker.Item label="Macho" value="macho" />
        <Picker.Item label="Hembra" value="hembra" />
      </Picker>
      <Text style={styles.label}>Edad</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Ej. 3" keyboardType="numeric" />
  
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Escribí una descripción..."
        multiline
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Ej. Buenos Aires" />

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.secondaryButton} onPress={async () => {
          const uri = await pickImageFromGallery();
          if (uri) setPhoto(uri);
        }}>
          <Text style={styles.secondaryText}>Seleccionar Imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={async () => {
          const uri = await takePhotoFromCamera();
          if (uri) setPhoto(uri);
        }}>
          <Text style={styles.secondaryText}>Tomar Foto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryText}>Publicar Mascota</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
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
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '500',
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
 label: {
    fontWeight: 'bold',
    marginTop: 10,
  },

   picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,}
  
});
