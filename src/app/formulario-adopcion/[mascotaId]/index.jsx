import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../context/authContext';

export default function FormularioAdopcion() {
  const { mascotaId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [vivienda, setVivienda] = useState('');
  const [tieneMascotas, setTieneMascotas] = useState(false);
  const [cantidadMascotas, setCantidadMascotas] = useState('');
  const [profesion, setProfesion] = useState('');
  const [comentarios, setComentarios] = useState('');

  const handleEnviar = async () => {
    if (!vivienda || !profesion) {
      Alert.alert('Faltan datos', 'Por favor completá todos los campos obligatorios.');
      return;
    }

    const nuevaSolicitud = {
      mascotaId,
      usuarioId: user?.id,
      vivienda,
      otrasMascotas: tieneMascotas ? `Sí, ${cantidadMascotas}` : 'No',
      profesion,
      comentarios,
      estado: 'pendiente',
    };

    try {
      await fetch('https://tp2-backend-production-eb95.up.railway.app/adoptionForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaSolicitud),
      });

      Alert.alert('¡Solicitud enviada!', 'Tu solicitud fue enviada al administrador.');
      router.push('/');
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      Alert.alert('Error', 'No se pudo enviar la solicitud.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Adopción</Text>

      <Text style={styles.label}>Tipo de vivienda</Text>
      <View  style={styles.pickerWrapper}> 
 <Picker
        selectedValue={vivienda}
        onValueChange={(itemValue) => setVivienda(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Casa con patio" value="Casa con patio" />
        <Picker.Item label="Casa sin patio" value="Casa sin patio" />
        <Picker.Item label="Departamento" value="Departamento" />
      </Picker>
      </View>
     

      <View style={styles.row}>
        <Text style={styles.label}>¿Tenés otras mascotas?</Text>
        <Switch
          value={tieneMascotas}
          onValueChange={(value) => setTieneMascotas(value)}
        />
      </View>

      {tieneMascotas && (
        <TextInput
          style={styles.input}
          placeholder="¿Cuántas?"
          value={cantidadMascotas}
          onChangeText={setCantidadMascotas}
          keyboardType="numeric"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Profesión"
        value={profesion}
        onChangeText={setProfesion}
      />

      <TextInput
        style={styles.textarea}
        placeholder="¿Por qué querés adoptar?"
        value={comentarios}
        onChangeText={setComentarios}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Quiero adoptar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    height: 100,
    marginBottom: 15,
  },
  picker: {
    marginBottom: 15,
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerWrapper: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 15,
  overflow: 'hidden',
}

});
