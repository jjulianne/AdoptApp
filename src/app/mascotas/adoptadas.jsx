import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useMascotas } from '../../context/mascotasContext';
import { router } from 'expo-router';

const Adoptadas = () => {
  const { user } = useAuth(); 
  const { mascotas, fetchMascotas } = useMascotas(); 
  const [adoptadas, setAdoptadas] = useState([]);

  useEffect(() => {
    fetchMascotas(); 
  }, []);

  useEffect(() => {
    if (user && mascotas.length > 0) {
      const filtradas = mascotas.filter(
        (mascota) => mascota.adoptedByUserId === user.id
      );
      setAdoptadas(filtradas);
    }
  }, [user, mascotas]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>Edad: {item.age}</Text>
      <Text>Raza: {item.breed}</Text>
      <Text>Ubicación: {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Mascotas que adoptaste</Text>

      {adoptadas.length === 0 ? (
        <Text style={styles.emptyText}>Aún no adoptaste ninguna mascota.</Text>
      ) : (
        <FlatList
          data={adoptadas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/mascotas/misSolicitudes')}
      >
        <Text style={styles.buttonText}>📋 Ver mis solicitudes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Adoptadas;

const styles = StyleSheet.create({
   
    container: {
         marginTop:50,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 20,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
