import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

export default function CardMascotas({ item }) {
    const router = useRouter();

    return (
    <View style={styles.card}>
        <ImageBackground 
            source={{ uri: item.type === "gato" ? `${item.photo}?t=${Date.now()}` : item.photo }} 
            style={styles.image} 
            imageStyle={styles.imageStyle}
        >
        <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
                {item.adopted ? 'Adoptado' : 'En Adopción'}
            </Text>
        </View>
        <View style={styles.overlay}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>
                {item.description || 'Este animalito busca un hogar lleno de amor.'}
            </Text>
        <View style={styles.infoRow}>
            {item.breed && (
                <View style={styles.infoTag}>
                    <Text style={styles.infoText}>{item.breed}</Text>
                </View>
            )}
            {item.age && (
                <View style={styles.infoTag}>
                    <Text style={styles.infoText}>{item.age} años</Text>
                </View>
            )}
            {item.type && (
                <View style={styles.infoTag}>
                    <Text style={styles.infoText}>{item.type}</Text>
                </View>
            )}
            {item.location && (
                <View style={styles.infoTag}>
                    <Ionicons name="location" size={12} color="#444" style={{ marginRight: 4 }} />
                    <Text style={styles.infoText}>{item.location}</Text>
                </View>
            )}
            </View>
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
                console.log("Item al hacer click:", item);
                router.push(`/${item.id}/detalle`);
            }}>
            <Text style={styles.buttonText}>Ver detalles</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground>
    </View>
);
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        height: 280,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 15,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    name: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        color: '#eee',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        gap: 8,
        marginTop: 8,
        marginBottom: 15,
    },
    infoTag: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: '#444',
        fontSize: 12,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#FF0000',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    statusBadge: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#FF0000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        zIndex: 1,
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
});
