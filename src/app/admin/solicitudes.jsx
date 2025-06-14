import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function SolicitudesAdmin() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  const fetchSolicitudes = async () => {
    try {
      const res = await fetch('https://tp2-backend-production-eb95.up.railway.app/adoptionForm');
      const data = await res.json();
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>🐶 Mascota : </Text> 
      <Text>👤 Usuario {item.usuarioId}</Text>
      <Text>🏠 Vivienda: {item.vivienda}</Text>
      <Text>💼 Profesión: {item.profesion}</Text>
      <Text>📝 Estado: {item.estado}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={() => actualizarEstado(item.id, 'aceptada')}
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => actualizarEstado(item.id, 'rechazada')}
        >
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`https://tp2-backend-production-eb95.up.railway.app/adoptionForm/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      fetchSolicitudes(); // refrescar después de actualizar
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  if (cargando) {
    return <ActivityIndicator size="large" color="#FF0000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Solicitudes de Adopción</Text>
      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 15 },
  buttons: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  button: { padding: 10, borderRadius: 8, width: '48%' },
  buttonText: { color: '#fff', textAlign: 'center' },
});
