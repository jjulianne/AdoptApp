import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView,Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/authContext';
import { useRouter } from 'expo-router';

export default function EditarPerfil() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [paseador, setPaseador] = useState(user?.paseador || false);
  const [veterinaria, setVeterinaria] = useState(user?.veterinaria || false);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleGuardar = async () => {
  const result = await updateUser({

  location,
  phone,
  avatar,
  paseador,
  veterinaria
});


    if (result.success) {
      Alert.alert('Perfil actualizado con éxito');
      router.push('/perfil');
    } else {
      Alert.alert('Error', result.message || 'No se pudo actualizar el perfil');
    }
  };

  return (<ScrollView contentContainerStyle={styles.container}>
  <Text style={styles.title}>Editar Perfil</Text>

  {/* Imagen de perfil con icono de cámara */}
  <View style={styles.profileImageContainer}>
    {avatar ? (
      <Image source={{ uri: avatar }} style={styles.profileImage} />
    ) : (
      <View style={[styles.profileImage, styles.avatarPlaceholder]}>
        <Text style={styles.avatarText}>Agregar Foto</Text>
      </View>
    )}
    <TouchableOpacity style={styles.changePictureButton} onPress={seleccionarImagen}>
      <Ionicons name="camera" size={20} color="#fff" />
    </TouchableOpacity>
  </View>

   <Text   > Editar ubicaicón:</Text>
 <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={location}
        onChangeText={setLocation}
      />
   
     <Text>Editar Telefono:</Text>
      <TextInput
        style={styles.input}
        placeholder="agregar telefono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

       <Text style={styles.label}>Quiero ofrecer un servicio:</Text>

      <View style={styles.switchContainer}>
        <Text>Paseador</Text>
        <Switch value={paseador} onValueChange={setPaseador} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Veterinario/a</Text>
        <Switch value={veterinaria} onValueChange={setVeterinaria} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop:50,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#555',
  },
      profileImageContainer: {
  position: 'relative',
  width: 100,
  height: 100,
  marginBottom: 20,
},

profileImage: {
  width: '100%',
  height: '100%',
  borderRadius: 50,
  borderWidth: 2,
  borderColor: '#E2E2E2',
},

changePictureButton: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#007AFF',
  borderRadius: 15,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#fff',
},

switchContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: 10,
},

});
