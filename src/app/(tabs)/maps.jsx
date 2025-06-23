import { View, StyleSheet, TouchableOpacity, Image, Text, Modal, Animated } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import MapViewComponent from '../../components/mapViewComponent';
import { useLocation } from '../../utils/useLocation';
import { geocodeLocation } from '../../utils/geocode';
import { ActivityIndicator } from 'react-native';


export default function Mapa({ route }) {
    const { manualLocation } = route?.params || {};
    const { location, errorMsg, isLoading: locationLoading } = useLocation(manualLocation);
    const [mapRegion, setMapRegion] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const cargarServicios = async () => {
        try {
            const res = await fetch('https://tp2-backend-production-eb95.up.railway.app/services');
            const data = await res.json();
            // Geocodificar ubicaciones que no tengan coordenadas
            const servicesConCoords = await Promise.all(
            data.message.map(async (service) => {
                if (service.location) {
                    const coords = await geocodeLocation(service.location);
                return { ...service, coordenadas: coords };
                }
                // Si no tiene ubicacion, pasa sin coordenadas
                return service; 
            })
            );
            setServices(servicesConCoords);
        } catch (e) {
            console.error('Error al cargar servicios', e);
            setError('No se pudieron cargar los servicios.');
        } finally {
            setLoading(false);
        }
        };
        cargarServicios();
    }, []);

    useEffect(() => {
        if (selectedService) {
            Animated.timing(fadeAnim, { toValue: 1, duration: 230, useNativeDriver: true }).start();
        } else {
            Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }).start();
        }
    }, [selectedService]);

    const centerUser = () => {
        if (mapRef.current && location) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            });
        }
    };

    const alignNorth = () => {
        if (mapRef.current && mapRegion) {
            mapRef.current.animateCamera({
                heading: 0,
                pitch: 0,
                center: { latitude: mapRegion.latitude, longitude: mapRegion.longitude },
            });
        }
    };

    if (locationLoading || loading) {
        return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
            <Text style={styles.loadingText}>Cargando mapa...</Text>
            </View>
        );
    }


    if (errorMsg || error) {
        return <View style={styles.container}><Text style={styles.errorText}>{errorMsg || error}</Text></View>;
    }

    return (
        <View style={styles.container}>
        <MapViewComponent
            location={location}
            mapRef={mapRef}
            services={services}
            onRegionChange={setMapRegion}
            onMarkerPress={setSelectedService}
        />
        <TouchableOpacity style={styles.centerButton} onPress={centerUser}>
            <Image source={require('../../../assets/location.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.alignButton} onPress={alignNorth}>
            <Image source={require('../../../assets/north-arrow-compass.png')} style={styles.icon} />
        </TouchableOpacity>
        {selectedService && (
            <Modal visible={!!selectedService} animationType="none" transparent onRequestClose={() => setSelectedService(null)}>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                    <Image source={require('../../../assets/service-veterinario.png')} style={styles.modalIcon} />
                    <View>
                    <Text style={styles.modalTitle}>{selectedService.title}</Text>
                    <Text style={styles.modalSubtitle}>{selectedService.description}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.closeModal} onPress={() => setSelectedService(null)}>
                    <Text style={styles.closeText}>Cerrar</Text>
                </TouchableOpacity>
                </View>
            </Animated.View>
            </Modal>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    centerButton: { 
        position: 'absolute', 
        bottom: 40, 
        right: 16, 
        backgroundColor: 'white', 
        padding: 12, 
        borderRadius: 24, 
        elevation: 6, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84 
    },
    alignButton: { 
        position: 'absolute', 
        bottom: 100, 
        right: 16, 
        backgroundColor: 'white', 
        padding: 10, 
        borderRadius: 20, 
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 1.41 
    },
    text: { 
        fontSize: 16, 
        textAlign: 'center' 
    },
    errorText: { 
        color: 'red', 
        fontSize: 16, 
        textAlign: 'center' 
    },
    icon: { 
        width: 32, 
        height: 32 
    },
    modalOverlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.45)', 
        justifyContent: 'flex-end' 
    },
    modalCard: { 
        backgroundColor: 'white', 
        borderTopLeftRadius: 26, 
        borderTopRightRadius: 26, 
        padding: 24, 
        paddingBottom: 36, 
        minHeight: 220, 
        elevation: 15, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: -3 }, 
        shadowOpacity: 0.13, 
        shadowRadius: 8 
    },
    modalHeader: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 16 
    },
    modalIcon: { 
        width: 38, 
        height: 38, 
        marginRight: 16 
    },
    modalTitle: { 
        fontSize: 22, 
        fontWeight: '700', 
        color: '#222' 
    },
    modalSubtitle: { 
        fontSize: 16, 
        color: '#707070', 
        marginTop: 4 
    },
    closeModal: { 
        alignSelf: 'center', 
        marginTop: 12, 
        padding: 6 
    },
    closeText: { 
        fontSize: 16, 
        color: '#007AFF', 
        fontWeight: '600' 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#555',
    },
});