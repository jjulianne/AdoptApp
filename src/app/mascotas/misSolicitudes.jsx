import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'expo-router';
import { useSolicitudes } from '../../context/solicitudesContext';


export default function SolicitudesRealizadas() {
    const router = useRouter();
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { eliminarSolicitud } = useSolicitudes(); // 👈 corregido para obtener correctamente la función

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/adoptionForm/byUser/${user?.id}`);
        const data = await res.json();
        setSolicitudes(data.message);
      } catch (error) {
        console.error('Error al obtener solicitudes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchSolicitudes();
    }
  }, [user]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  if (solicitudes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No realizaste ninguna solicitud aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Mis solicitudes</Text>
      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>Mascota: {item.Pet.name}</Text>
            <Image
              source={{ uri: item.Pet?.photo }}
              style={styles.image}
            />
            <Text>Estado: {item.estado}</Text>

            {item.estado === "pendiente" && (
              <TouchableOpacity
                style={styles.botonCancelar}
                onPress={async () => {
                  await eliminarSolicitud(item.id);
                  setSolicitudes((prev) => prev.filter((s) => s.id !== item.id));
                }}
              >
                <Text style={styles.textoBoton}>Cancelar solicitud</Text>
              </TouchableOpacity>
            )}
           

             
          </View>
        )}

        
      />
       <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                            <Text style={styles.buttonText}>← Volver</Text>
                          </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {marginTop:50, flex: 1, padding: 20, backgroundColor: '#fff' },
  text: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },image: {
  width: 100,
  height: 100,
  borderRadius: 8,
  marginTop: 10,
  marginBottom: 10,
},
nombre: {
  fontWeight: 'bold',
  fontSize: 16,
},
botonCancelar: {
  backgroundColor: '#FF4D4D',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
},
textoBoton: {
  color: 'white',
  fontWeight: 'bold',
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

});
