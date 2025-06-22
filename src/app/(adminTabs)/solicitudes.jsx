import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSolicitudes } from '../../context/solicitudesContext';

export default function SolicitudesAdmin() {
  const router = useRouter();
  const {
    solicitudes,
    loading,
    actualizarSolicitud,
  
  } = useSolicitudes(); 

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push(`/${item.petId}/detalle`)}>
        <Text style={styles.link}>🐶 Ver ficha de la mascota</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(`/admin/usuarios/${item.userId}`)}>
        <Text style={styles.link}>👤 Ver perfil del solicitante</Text>
      </TouchableOpacity>

      <Text style={styles.text}>🏠 Vivienda: <Text style={styles.bold}>{item.vivienda}</Text></Text>
      <Text style={styles.text}>💼 Profesión: <Text style={styles.bold}>{item.profesion}</Text></Text>
      <Text style={styles.text}>🐾 ¿Tiene otras mascotas?: <Text style={styles.bold}>{item.otrasMascotas}</Text></Text>
      <Text style={styles.text}>💬 Porque queres adoptar una mascota?: <Text style={styles.bold}>{item.comentarios}</Text></Text>
      <Text style={styles.estado}>📋 Estado: {item.estado}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => actualizarSolicitud(item.id, 'aceptada')}
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#F44336' }]}
          onPress={() => actualizarSolicitud(item.id,"rechazada")}
        >
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
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
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  link: {
    color: '#007BFF',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 4,
    fontSize: 14,
  },
  bold: {
    fontWeight: '600',
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
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
