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

    const { geometry, components } = data.results[0];

    return {
      latitude: geometry.lat,
      longitude: geometry.lng,
      city: components.city || components.town || components.village || "",
      country: components.country || "",
      formatted: data.results[0].formatted,
    };
  } catch (error) {
    console.error("Error en geocodificación:", error);
    throw error;
  }
}
