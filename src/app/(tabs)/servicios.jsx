import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function Servicios() {
    const [tipoServicio, setTipoServicio] = useState('paseador');
    const [ubicacion, setUbicacion] = useState('Prueba'); 
    const [searchText, setSearchText] = useState(''); 

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Ubicacion */}
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.addressContainer}>
                        <Ionicons name="location-sharp" size={18} color="#FF0000" />
                        <Text style={styles.addressText}>{ubicacion}</Text>
                        <Ionicons name="chevron-down" size={16} color="#444" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>

                {/* Barra de Busqueda */}
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchInputWrapper}>
                        <Ionicons name="search" size={20} color="#777" style={{ marginRight: 10 }} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar en servicios..."
                            placeholderTextColor="#888"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <TouchableOpacity style={styles.searchButton}>
                        <Ionicons name="search-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>


                {/* Selector de tipo de servicio */}
                <View style={styles.selectorContainer}>
                    <Text style={styles.selectorLabel}>Tipos de servicios:</Text>
                    <View style={styles.selectorButtons}>
                        <TouchableOpacity
                            style={[
                                styles.selectorButton,
                                tipoServicio === 'paseador' && styles.selectorButtonActivo
                            ]}
                            onPress={() => setTipoServicio('paseador')}
                        >
                            <Text style={styles.selectorTexto}>Paseador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.selectorButton,
                                tipoServicio === 'veterinaria' && styles.selectorButtonActivo
                            ]}
                            onPress={() => setTipoServicio('veterinaria')}
                        >
                            <Text style={styles.selectorTexto}>Veterinaria</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tarjetas */}
                <View style={styles.card}>
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imageText}>[Imagen del servicio]</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.nombre}>
                            {tipoServicio === 'paseador' ? 'Juan Pérez' : 'Veterinaria Central'}
                        </Text>

                        <Text style={styles.descripcion}>
                            {tipoServicio === 'paseador'
                                ? 'Paseador de mascotas con experiencia y trato amable.'
                                : 'Veterinaria con atención 24hs y profesionales calificados.'}
                        </Text>

                        <View style={styles.detalles}>
                            <View style={styles.item}>
                                <FontAwesome name="star" size={16} color="orange" />
                                <Text style={styles.itemText}>4.9</Text>
                            </View>
                            <View style={styles.item}>
                                <Ionicons name="location" size={16} color="#444" />
                                <Text style={styles.itemText}>Cerca</Text>
                            </View>
                            <View style={styles.item}>
                                <FontAwesome name="dollar" size={16} color="#444" />
                                <Text style={styles.itemText}>$1.400/h</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Contactar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    // --- Ubicacion ---
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 0,
        marginBottom: 0,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5,
    },
    // --- Barra de Busqueda ---
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 5, 
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 10, 
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 0,
    },
    searchButton: {
        backgroundColor: '#FF0000',
        borderRadius: 12,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectorContainer: {
        marginBottom: 15,
        marginTop: 10,
    },
    selectorLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    selectorButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    selectorButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    selectorButtonActivo: {
        backgroundColor: '#000',
    },
    selectorTexto: {
        color: '#fff',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        color: '#888',
        fontStyle: 'italic',
    },
    info: {
        padding: 15,
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    descripcion: {
        fontSize: 14,
        color: '#555',
        marginTop: 6,
        marginBottom: 15,
        lineHeight: 20,
    },
    detalles: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
        paddingVertical: 5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 14,
        marginLeft: 6,
        color: '#444',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});