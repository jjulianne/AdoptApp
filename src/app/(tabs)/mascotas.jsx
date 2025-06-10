import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useMascotas } from '../../context/mascotasContext'
import CardMascotas from '../../components/cardMascotas';

export default function mascotas() {
    const { mascotas, loadingMascotas, errorMascotas, fetchMascotas } = useMascotas();

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
                if (item && typeof item.id !== 'undefined' && item.id !== null && !isNaN(item.id)) {
                    return item.id.toString();
                }
            return `${item?.type || 'unknown'}-${index}`;
            }}
            renderItem={({ item }) => <CardMascotas item={item} />}
            showsVerticalScrollIndicator={false}
        />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, marginTop: 50, backgroundColor: '#f5f5f5' },
    container: { flex: 1, paddingTop: 15, paddingHorizontal: 20, backgroundColor: '#f5f5f5' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
    emptyText: { fontSize: 18, color: '#666', textAlign: 'center', marginTop: 15, fontWeight: 'bold' },
    emptySubText: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 5 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
    errorText: { fontSize: 16, color: '#FF0000', textAlign: 'center', marginTop: 10 },
    retryButton: { backgroundColor: '#FF0000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginTop: 20 },
    retryButtonText: { color: '#fff', fontWeight: 'bold' },
});