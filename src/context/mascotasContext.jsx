import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const MascotasContext = createContext();
export const useMascotas = () => useContext(MascotasContext);


export const MascotasProvider = ({ children }) => {
    const [mascotas, setMascotas] = useState([]);
    const [loadingMascotas, setLoadingMascotas] = useState(true);
    const [errorMascotas, setErrorMascotas] = useState(null);
    const {user} = useAuth()

    const API_URL = "https://tp2-backend-production-eb95.up.railway.app/pets";

  // Función para obtener las mascotas
    const fetchMascotas = async () => {
    setLoadingMascotas(true);
    setErrorMascotas(null);
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
        throw new Error(
            `Error al cargar las mascotas: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();

  const mascotasDisponibles = data.message
  .filter((mascota) => !mascota.adopted)
  .map((mascota) => {
    // Si la mascota ya tiene una foto, la usamos
    let imagen = mascota.photo;

    // Si no tiene foto, asignamos una por defecto según su tipo
    if (!imagen || imagen.trim() === "") {
      if (mascota.type === "perro") {
        imagen = `https://placedog.net/400/300?id=${mascota.id}`;
      } else {
        imagen = "https://cataas.com/cat";
      }
    }

    return {
      ...mascota,
      photo: imagen,
    };
  });

setMascotas(mascotasDisponibles);

    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        setErrorMascotas(
        "No se pudieron cargar las mascotas. Inténtalo de nuevo más tarde."
    );
    } finally {
        setLoadingMascotas(false);
    }
};

  // Efecto para cargar las mascotas al inicio
    useEffect(() => {
    fetchMascotas();
    }, []);

    const adoptarMascota = async (mascotaId) => {
    try {
        const response = await fetch(`${API_URL}/${mascotaId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ adopted: true }),
    });

    if (!response.ok) {
        throw new Error("Error al adoptar la mascota.");
    }

    setMascotas((prevMascotas) =>
        prevMascotas.filter((mascota) => mascota.id !== mascotaId)
    );
    alert("¡Mascota adoptada con éxito!");
    } catch (error) {
        console.error("Error al adoptar mascota:", error);
        alert(`Error al adoptar la mascota: ${error.message}`);
    }
};

    const obtenerMascotaPorId = (id) => {
    return mascotas.find((mascota) => mascota.id === id);
    };




const publicarMascota = async ({ name, type, breed, age, photo, description, location,gender }) => {
  try {
    const nuevaMascota = {
      name,
      type,
      breed,
      age: Number(age),
      photo, // esto es el URI de la imagen tomada o seleccionada 
      description,
      location,
      gender,
      adopted: false,
      userId: user?.id,
    };

    const response = await fetch('https://tp2-backend-production-eb95.up.railway.app/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaMascota)
    });

    if (!response.ok) throw new Error('Error al publicar mascota');

    const mascotaGuardada = await response.json();
    setMascotas(prev => [mascotaGuardada, ...prev]);
  } catch (error) {
    console.error("Error al publicar:", error);
  }
};


    return (
    <MascotasContext.Provider
        value={{
        mascotas,
        loadingMascotas,
        errorMascotas,
        fetchMascotas,
        adoptarMascota,
        obtenerMascotaPorId,
        publicarMascota
        }}
    >
    {children}
    </MascotasContext.Provider>
    );
};