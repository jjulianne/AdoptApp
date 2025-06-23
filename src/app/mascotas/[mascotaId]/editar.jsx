import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useMascotas } from '../../../context/mascotasContext';
import { pickImageFromGallery, takePhotoFromCamera } from '../../../utils/image.picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function EditarMascota() {
  const { mascotaId} = useLocalSearchParams();
  const router = useRouter();
  const { editarPublicacion, obtenerMascotaPorId } = useMascotas();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [tipo, setTipo] = useState('Perro');
  const [genero, setGenero] = useState('Macho');
  const [descripcion, setDescripcion] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const cargarDatosMascota = async () => {
      try {
        const mascota = await obtenerMascotaPorId(mascotaId);
        if (mascota) {
          setNombre(mascota.name);
          setEdad(mascota.age);
          setTipo(mascota.type);
          setGenero(mascota.gender);
          setDescripcion(mascota.description);
          setPhoto(mascota.photo);
        }
      } catch (error) {
        console.error('Error al cargar la mascota:', error);
      }
    };

    if (mascotaId) cargarDatosMascota();
  }, [mascotaId]);

  const handleEditar = async () => {
   

    const mascotaActualizada = {
      name: nombre,
      age: edad,
      type: tipo,
      gender: genero,
      description: descripcion,
      photo: photo,
    };
console.log("Mascota actualizada:", mascotaActualizada);

    try {
      await editarPublicacion(mascotaId, mascotaActualizada);
      Alert.alert('Éxito', 'La publicación fue actualizada.');
      router.push('/mascotas/publicadas');
    } catch (error) {
      console.error('Error al editar mascota:', error);
      Alert.alert('Error', 'No se pudo actualizar la mascota.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar publicación</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)}>
          <Picker.Item label="Perro" value="Perro" />
          <Picker.Item label="Gato" value="Gato" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker selectedValue={genero} onValueChange={(itemValue) => setGenero(itemValue)}>
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Hembra" value="Hembra" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

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

      <TouchableOpacity style={styles.button} onPress={handleEditar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#4f8cff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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
});
