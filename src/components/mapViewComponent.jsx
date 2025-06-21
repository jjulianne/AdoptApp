import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewComponent({ location, mapRef, services, onRegionChange, onMarkerPress, style }) {
    if (!location) return null;

    // Para evitar error en servicios que no pasan coordenadas
    const validServices = services.filter(
        (service) => service.coordenadas && typeof service.coordenadas.latitude === 'number' && typeof service.coordenadas.longitude === 'number'
    );

    return (
        <MapView
            mapType="standard"
            style={[styles.map, style]}
            ref={mapRef}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsCompass
        onRegionChange={onRegionChange}>
        
        {validServices.map((service) => (
        <Marker
            key={service.id}
            coordinate={service.coordenadas}
            onPress={() => onMarkerPress(service)}>
            <Image
                source={require('../../assets/service-veterinario.png')}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
            />
        </Marker>
        ))}

    </MapView>
    );
}

const styles = StyleSheet.create({
    map: { 
        flex: 1 
    },
});