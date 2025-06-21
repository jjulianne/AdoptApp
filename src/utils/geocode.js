const OPENCAGE_API_KEY = 'Td8b1a321a5bf43ba89090ae5b0abb956';

export async function geocodeLocation(address) {

    if (!address || address.trim() === '') return null;

    try {
        const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}&language=es&limit=1`
        );
        const data = await response.json();

        if (data.results.length === 0) {
        throw new Error('No se encontraron resultados para la dirección');
        }

        const { lat, lng } = data.results[0].geometry;

        return {
        latitude: lat,
        longitude: lng,
        };
    } catch (error) {
        console.error('Error en geocodificación:', error);
        return null;
    }
};
