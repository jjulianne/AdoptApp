import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,Image} from 'react-native';
import { useRouter } from 'expo-router';

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsuarios = async () => {
    try {
      const res = await fetch('https://tp2-backend-production-eb95.up.railway.app/users');
      const data = await res.json();
      setUsuarios(data.message || []);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    Alert.alert('Confirmar eliminación', '¿Estás segura de que querés eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/users/${id}`, {
              method: 'DELETE'
            });

            if (res.ok) {
              Alert.alert('Éxito', 'Usuario eliminado correctamente');
              fetchUsuarios();
            }
          } catch (error) {
            console.error('Error al eliminar usuario:', error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const renderItem = ({ item }) => (

    
    <View style={styles.card}>
         <Image
    source={{ uri: item.avatar || 'https://via.placeholder.com/80' }}
    style={styles.avatar}
  />
      <Text style={styles.nombre}>👤 {item.username}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Rol: {item.isAdmin ? 'Admin' : 'Usuario'}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/admin/usuarios/${item.id}`)}
        >
          <Text style={styles.buttonText}>Ver perfil</Text>
        </TouchableOpacity>

        {!item.isAdmin && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F44336' }]}
            onPress={() => eliminarUsuario(item.id)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FF0000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginBottom: 10,
  alignSelf: 'center',
}

});
