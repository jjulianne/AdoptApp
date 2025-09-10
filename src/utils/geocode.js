import * as Location from 'expo-location';


const OPENCAGE_API_KEY = "d8b1a321a5bf43ba89090ae5b0abb956";

export async function geocodeLocation(address) {
  if (!address || address.trim() === "") return null;

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${OPENCAGE_API_KEY}&language=es&limit=1`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error("No se encontraron resultados para la dirección");
    }

    const { lat, lng } = data.results[0].geometry;

    return {
      latitude: lat,
      longitude: lng,
    };
  } catch (error) {
    console.error("Error en geocodificación:", error);
    return null;
  }

}

export async function reverseGeocodeLocation(lat, lng) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=es&limit=1`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error("No se encontró dirección para las coordenadas");
    }

    const components = data.results[0].components;

    const barrio = components.suburb || components.neighbourhood || "";
    const ciudad = components.city || components.town || components.village || "";

  return `${barrio}, ${ciudad}`;

  } catch (error) {
    console.error("Error en reverse geocoding:", error);
    return "Ubicación desconocida";
  }
}

export async function obtenerUbicacionPerfilTexto() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Permiso de ubicación denegado");
      return null;
    }

    console.log("Obteniendo coordenadas actuales");
    const currentLocation = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = currentLocation.coords;

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d8b1a321a5bf43ba89090ae5b0abb956&language=es&limit=1`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log("No se encontraron resultados de ubicación.");
      return null;
    }

    const components = data.results[0].components;
    const barrio = components.suburb || components.neighbourhood || components.city_district || "";
    const ciudad = components.city || components.town || components.state || "";

    const ubicacion = `${barrio}, ${ciudad}`.trim().replace(/^,|,$/g, "");
    console.log("✅ Ubicación generada:", ubicacion);

    return ubicacion;

  } catch (e) {
    console.error("🔥 Error al obtener ubicación:", e);
    return null;
  }
}

