import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
    const { logout } = useAuth();
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleChangeProfilePicture = () => {
        // Lógica para cambiar la foto de perfil (ej. abrir la galería/cámara)
        console.log('Cambiar foto de perfil');
        alert('Funcionalidad para cambiar foto de perfil mas adelante');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Sección A: Perfil */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
                        <Text style={styles.closeButtonText}>Atras</Text>
                    </TouchableOpacity>
                    <Text style={styles.profileTitle}>Perfil</Text>
                    <View style={{width: 50}} /> 
                </View>

                <View style={styles.profileInfoSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/women/14.jpg' }}
                            style={styles.profileImage}
                        />
                        {/* Cambiar la foto de perfil */}
                        <TouchableOpacity style={styles.changePictureButton} onPress={handleChangeProfilePicture}>
                            <Ionicons name="camera" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>Nombre del usuario</Text>
                    <Text style={styles.profileLocation}>Ubicacion del usuario</Text>
                    <Text style={styles.profileDescription}>Descripcion del usuario</Text>
                </View>

                {/* Sección B: Opciones Principales */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Opcion 1</Text>
                        <View style={styles.listItemRight}>
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationBadgeText}>14</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Opcion 2</Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                    </TouchableOpacity>
                </View>

                {/* Sección C: Mas opciones */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Opcion 3</Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Opcion 4</Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Opcion 5</Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                    </TouchableOpacity>
                </View>

                {/* Sección D: Cerrar Sesión */}
                <View style={styles.signOutSection}>
                    <TouchableOpacity onPress={logout}>
                        <Text style={styles.signOutButtonText}>Cerrar sesion</Text>
                    </TouchableOpacity>
                    <Text style={styles.appInfoText}>
                        AdoptApp, version beta 0.10.
                    </Text>
                    <Text style={styles.appInfoText}> {/* Nuevo Text para la segunda línea */}
                        Todos los derechos reservados.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        paddingTop: 15,
    },
    // Sección A: Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E2E2E2',
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    closeButtonText: {
        fontSize: 17,
        color: '#007AFF',
    },
    profileTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    profileInfoSection: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E2E2E2',
        marginBottom: 20,
    },
    profileImageContainer: {
        position: 'relative',
        width: 90,
        height: 90,
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#E2E2E2',
    },
    changePictureButton: { 
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF', 
        borderRadius: 15, 
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    profileLocation: {
        fontSize: 15,
        color: '#6A6A6A',
        marginBottom: 5,
    },
    profileDescription: {
        fontSize: 14,
        color: '#4A4A4A',
        textAlign: 'center',
        marginHorizontal: 40,
        marginBottom: 20,
        lineHeight: 20,
    },
    iconButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    iconButton: {
        padding: 10,
    },

    // Secciones B y C: Listas de opciones
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    listItemText: {
        fontSize: 16,
        color: '#000',
    },
    listItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationBadge: {
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginRight: 8,
    },
    notificationBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E2E2E2',
        marginLeft: 15,
    },

    // Sección D: Cerrar Sesión
    signOutSection: {
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    signOutButtonText: {
        fontSize: 17,
        color: '#FF0000',
        fontWeight: '500',
        paddingVertical: 10,
    },
    appInfoText: {
        fontSize: 12,
        color: '#8A8A8E',
        textAlign: 'center',
        marginTop: 5,
    },
});