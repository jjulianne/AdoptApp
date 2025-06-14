import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalleMascota() {
  const { mascotaId } = useLocalSearchParams();
  const router = useRouter();
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/pets/${mascotaId}`);
        const data = await res.json();
        setDatos(data.message);
      } catch (error) {
        console.error("Error al cargar mascota", error);
      } finally {
        setCargando(false);
      }
    };

    if (mascotaId) {
      fetchMascota();
    }
  }, [mascotaId]);

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text>Cargando mascota...</Text>
      </View>
    );
  }

  if (!datos) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo cargar la mascota.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: datos.type === "gato" ? `${datos.photo}?t=${Date.now()}` : datos.photo }}
          style={styles.image}
        />
        <Text style={styles.name}>{datos.name}</Text>
        <Text style={styles.desc}>{datos.description || 'Sin descripción'}</Text>
        <Text style={styles.info}>Edad: {datos.age} años</Text>
        <Text style={styles.info}>Raza: {datos.breed}</Text>
        <Text style={styles.info}>Tipo: {datos.type}</Text>
        <Text style={styles.info}>Ubicación: {datos.location}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/formulario-adopcion/${datos.id}`)}
        >
          <Text style={styles.buttonText}>Quiero adoptar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100, // 👈 da espacio después del botón
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
