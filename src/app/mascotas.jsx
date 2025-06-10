import React from 'react';
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useMascotas } from '../context/mascotasContext'
import {useRouter} from 'expo-router';

export default function mascotas() {
    const { mascotas, loadingMascotas, errorMascotas, fetchMascotas } = useMascotas(); 

    const router = useRouter();

    if (loadingMascotas) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF0000" />
                <Text style={styles.loadingText}>Cargando mascotas...</Text>
            </View>
        );
    }

    if (errorMascotas) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={50} color="#FF0000" />
                <Text style={styles.errorText}>{errorMascotas}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => fetchMascotas()}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (mascotas.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="sad-outline" size={50} color="#888" />
                <Text style={styles.emptyText}>No hay mascotas disponibles en este momento.</Text>
                <Text style={styles.emptySubText}>¡Vuelve pronto!</Text>
            </View>
        );
    }

    return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <FlatList
                data={mascotas}
                keyExtractor={(item, index) => {
                // Verifica si item.id es un valor numérico válido y no es NaN
                    if (item && typeof item.id !== 'undefined' && item.id !== null && !isNaN(item.id)) {
                    return item.id.toString();
                    }
                    // Si item.id no es válido (ej. NaN), crea una clave única con el tipo y el índice
                    return `${item?.type || 'unknown'}-${index}`;
                }}
                renderItem={({ item }) => (
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
                                               }}
                                >
                                    <Text style={styles.buttonText}>Ver detalles</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 15,
        fontWeight: 'bold',
    },
    emptySubText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginTop: 5,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 10,
    },
    retryButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
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
