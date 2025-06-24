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
} from 'react-native';
import { useMascotas } from '../../../context/mascotasContext';
import { pickImageFromGallery, takePhotoFromCamera } from '../../../utils/image.picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { uploadImageToCloudinary } from '../../../utils/cloudinary';

export default function EditarMascota() {
  const { mascotaId } = useLocalSearchParams();
  const router = useRouter();
  const { editarPublicacion, obtenerMascotaPorId } = useMascotas();
  const [mascota, setMascota] = useState(null);
 const [nombre, setNombre] = useState(null);
  const [edad, setEdad] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [genero, setGenero] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [location, setLocation] = useState(null);
  const [photo,setPhoto]= useState(null)
  const [cargando, setCargando] = useState(true); // ← Estado de carga


useEffect(() => {
  const cargarDatosMascota = async () => {
    try {
      const datos = await obtenerMascotaPorId(mascotaId);
      console.log("Mascota recibida:", datos);
      if (datos) {
        setMascota(datos);
      } else {
        console.warn("No se encontró la mascota con ese ID.");
      }
    } catch (error) {
      console.error("Error al cargar la mascota:", error);
    } finally {
      setCargando(false);
    }
  };

  if (mascotaId) cargarDatosMascota();
}, [mascotaId]);





  const handleEditar = async () => {
    try {
      let nuevaUrl = photo;

      if (photo?.startsWith('file://')) {
        nuevaUrl = await uploadImageToCloudinary(photo, 'mascota_editada.jpg');
      }

      const mascotaActualizada = {
        name: nombre,
        age: edad,
        type: tipo,
        gender: genero,
        description: descripcion,
        location: location,
        photo: nuevaUrl,
      };

      await editarPublicacion(mascotaId, mascotaActualizada);
      Alert.alert('Éxito', 'La publicación fue actualizada.');
      router.push('/mascotas/publicadas');
    } catch (error) {
      console.error('Error al editar mascota:', error);
      Alert.alert('Error', 'No se pudo actualizar la mascota.');
    }
  };

  if (cargando) {
    return (
      <View style={styles.loader}>
        <Text>Cargando datos de la mascota...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar publicación</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la mascota"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad en años"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipo} onValueChange={setTipo}>
          <Picker.Item label="Perro" value="Perro" />
          <Picker.Item label="Gato" value="Gato" />
        </Picker>
      </View>

      <Text style={styles.label}>Género</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={genero} onValueChange={setGenero}>
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Hembra" value="Hembra" />
        </Picker>
      </View>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describí la personalidad, historia, etc."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Palermo, CABA"
        value={location}
        onChangeText={setLocation}
      />

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            const uri = await pickImageFromGallery();
            if (uri) setPhoto(uri);
          }}
        >
          <Text style={styles.secondaryText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            const uri = await takePhotoFromCamera();
            if (uri) setPhoto(uri);
          }}
        >
          <Text style={styles.secondaryText}>Tomar Foto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

 <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Text style={styles.buttonText}>← Volver</Text>
              </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    marginTop:50,
    backgroundColor: '#f9f9f9',
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
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
    color: '#333',
    fontWeight: '500',
  },
  button: {
    marginTop:15,
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
