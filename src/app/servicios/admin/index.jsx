import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function AdminServicios() {
  const router = useRouter();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServicios = async () => {
    try {
      const res = await fetch("https://tp2-backend-production-eb95.up.railway.app/services");
      const data = await res.json();
      setServicios(data.message || []);
    } catch (error) {
      console.error("Error al cargar servicios", error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarServicio = async (id) => {
    Alert.alert(
      "Eliminar Servicio",
      "¿Estás seguro que querés eliminar este servicio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/services/${id}`, {
                method: "DELETE",
              });
              if (res.ok) {
                setServicios((prev) => prev.filter((s) => s.id !== id));
              } else {
                Alert.alert("Error", "No se pudo eliminar el servicio");
              }
            } catch (error) {
              Alert.alert("Error", "Error de conexión");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>🔧 Tipo: {item.serviceType}</Text>
      <Text style={styles.text}>📍 Ubicación: {item.location || 'No definida'}</Text>
      <Text style={styles.text}>💲 Precio: ${item.price}</Text>
      <Text style={styles.text}>📝 Descripción: {item.description || 'Sin descripción'}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => router.push(`/servicios/admin/editar/${item.id}`)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#F44336' }]}
          onPress={() => eliminarServicio(item.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FF0000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Servicios publicados</Text>
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay servicios cargados.</Text>}
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
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
    fontSize: 14,
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