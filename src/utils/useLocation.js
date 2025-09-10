import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation(manualLocation = null) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const GOOGLE_MAPS_APIKEY = 'AIzaSyA5_igLeSHGtZ5Z0vj1Ilib7d7s93C3buU'

    useEffect(() => {
        const fetchLocation = async () => {
        try {
            if (manualLocation) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${GOOGLE_MAPS_APIKEY}`
                );
                const data = await response.json();

            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                setLocation({ lat: lat, lng: lng });
            } else {
                setErrorMsg('Ubicación no encontrada');
            }
            } else {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permiso de ubicación denegado');
                return;
                }
                const loc = await Location.getCurrentPositionAsync();
                setLocation(loc.coords);
            }
        } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
        } finally {
        setIsLoading(false);
        }
    };

    fetchLocation();
    }, [manualLocation]);

    return { location, errorMsg, isLoading };
}