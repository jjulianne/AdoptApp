import React, { useState,useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../context/authContext';





export default function FormularioAdopcion() {
    const { mascotaId } = useLocalSearchParams();
   
    const router = useRouter();
   const { user } = useAuth();

    const [vivienda, setVivienda] = useState('');
    const [otrasMascotas, setOtrasMascotas] = useState('');
    const [profesion, setProfesion] = useState('');
    const [comentarios, setComentarios] = useState('');

    const handleEnviar = async () => {
        
        if (!vivienda || !otrasMascotas || !profesion) {
            Alert.alert('Faltan datos', 'Por favor completá todos los campos obligatorios.');
            return;
        }
console.log('👤 Usuario logueado:', user);  
        const nuevaSolicitud = {
           mascotaId,
           usuarioId: user?.id,
            vivienda,
            otrasMascotas,
            profesion,
            comentarios,
            estado: 'pendiente',
             
        };
       console.log ("USER ID "+user.id)

        try {
            await fetch('https://6848972cec44b9f349415d7f.mockapi.io/solicitudes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaSolicitud),
               
            });
            

            Alert.alert('¡Solicitud enviada!', 'Tu solicitud fue enviada al administrador.');
            router.push('/'); 
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            Alert.alert('Error', 'No se pudo enviar la solicitud.');
        }
    };
console.log('🧑‍💻 Usuario desde contexto:', user);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Formulario de Adopción</Text>

            <TextInput
                style={styles.input}
                placeholder="Tipo de vivienda (casa, depto...)"
                value={vivienda}
                onChangeText={setVivienda}
            />

            <TextInput
                style={styles.input}
                placeholder="¿Tenés otras mascotas?"
                value={otrasMascotas}
                onChangeText={setOtrasMascotas}
            />

            <TextInput
                style={styles.input}
                placeholder="Profesión"
                value={profesion}
                onChangeText={setProfesion}
            />

            <TextInput
                style={styles.textarea}
                placeholder="¿Por qué querés adoptar?"
                value={comentarios}
                onChangeText={setComentarios}
                multiline
                numberOfLines={4}
            />

          <TouchableOpacity
  style={styles.button}
  onPress={handleEnviar}
>
  <Text style={styles.buttonText}>Quiero adoptar</Text>
</TouchableOpacity>

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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        height: 100,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
