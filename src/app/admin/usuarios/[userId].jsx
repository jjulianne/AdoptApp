import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
      <Text style={styles.title}>👤 Perfil del Usuario</Text>

      {usuario.avatar && (
        <Image source={{ uri: usuario.avatar }} style={styles.avatar} />
      )}

      <Text style={styles.label}>📧 Usuario :</Text>
      <Text style={styles.text}>{usuario.username}</Text>

      {usuario.phone && (
        <>
          <Text style={styles.label}>📞 Teléfono:</Text>
          <Text style={styles.text}>{usuario.phone}</Text>
        </>
      )}

      {usuario.location && (
        <>
          <Text style={styles.label}>📍 Ubicación:</Text>
          <Text style={styles.text}>{usuario.location}</Text>
        </>
      )}

      

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
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
