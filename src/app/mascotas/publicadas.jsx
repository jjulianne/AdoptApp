
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useMascotas } from '../../context/mascotasContext';
import CardMascotas from '../../components/cardMascotas';
import { useRouter } from 'expo-router';

export default function MascotasPublicadas() {
    const {fetchMascotas}= useMascotas()
    
    const router = useRouter();
    
  const { user } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerMascotas = async () => {
      setLoading(true);
      try {
        const todas = await fetchMascotas();
    
        const mias = todas.filter(m => m.userId === user?.id);
       
        setMascotas(mias);
      } catch (error) {
        console.error('Error al obtener mascotas publicadas:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerMascotas();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (!mascotas.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No publicaste ninguna mascota aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Mis mascotas publicadas</Text>
      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardMascotas item={item} />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/perfil')}>
        <Text style={styles.buttonText}>Volver al perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  noData: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
