import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PerfilUsuarioAdmin() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/users/${userId}`);
        const data = await res.json();
        setUsuario(data.message);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      } finally {
        setCargando(false);
      }
    };

    if (userId) fetchUsuario();
  }, [userId]);

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo cargar el perfil del usuario.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil del Usuario 🐾</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.text}>{usuario.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{usuario.email}</Text>

      <Text style={styles.label}>Rol:</Text>
      <Text style={styles.text}>{usuario.isAdmin ? 'Administrador' : 'Usuario común'}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
