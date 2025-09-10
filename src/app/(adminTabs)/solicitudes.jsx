import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSolicitudes } from '../../context/solicitudesContext';

export default function SolicitudesAdmin() {
  const router = useRouter();
  const { solicitudes, loading, actualizarSolicitud } = useSolicitudes();
  const [filtro, setFiltro] = useState('pendiente');

  const filtrarSolicitudes = (estado) => {
    if (estado === 'todas') return solicitudes;
    return solicitudes.filter((s) => s.estado === estado);
  };

  const renderCard = (item) => (
    <View style={styles.card} key={item.id}>
      <TouchableOpacity onPress={() => router.push(`/mascotas/${item.petId}/detalle`)}>
        <Text style={styles.link}>🐶 Ver ficha de la mascota</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(`/admin/usuarios/${item.userId}`)}>
        <Text style={styles.link}>
          {item.estado === 'aceptada' ? '👤 Ver perfil del adoptante' : '👤 Ver perfil del solicitante'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.text}>🏠 Vivienda: <Text style={styles.bold}>{item.vivienda}</Text></Text>
      <Text style={styles.text}>💼 Profesión: <Text style={styles.bold}>{item.profesion}</Text></Text>
      <Text style={styles.text}>🐾 ¿Tiene otras mascotas?: <Text style={styles.bold}>{item.otrasMascotas}</Text></Text>
      <Text style={styles.text}>💬 Comentarios: <Text style={styles.bold}>{item.comentarios}</Text></Text>
      <Text style={styles.estado}>📋 Estado: {item.estado}</Text>

      {item.estado === 'pendiente' && (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={() => actualizarSolicitud(item.id, 'aceptada')}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F44336' }]}
            onPress={() => actualizarSolicitud(item.id, 'rechazada')}
          >
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#FF0000" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📋 Solicitudes de Adopción</Text>

      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setFiltro('pendiente')}><Text style={styles.filtro}>Pendientes</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('aceptada')}><Text style={styles.filtro}>Aceptadas</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('rechazada')}><Text style={styles.filtro}>Rechazadas</Text></TouchableOpacity>
        
      </View>

      {filtrarSolicitudes(filtro).map(renderCard)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filtro: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  link: {
    color: '#007BFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 6,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  estado: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});