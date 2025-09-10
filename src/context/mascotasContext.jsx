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
   // En fetchMascotas (mascotasContext.js o donde lo tengas)
const fetchMascotas = async () => {
  setLoadingMascotas(true);
  setErrorMascotas(null);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al cargar mascotas: ${response.statusText}`);
    }

    const data = await response.json();
    const todasLasMascotas = data.message.map(mascota => ({
      ...mascota,
      photo: mascota.photo || (mascota.type === 'perro'
        ? `https://placedog.net/400/300?id=${mascota.id}`
        : 'https://cataas.com/cat'),
    }));

    setMascotas(todasLasMascotas);
    return todasLasMascotas;
  } catch (err) {
    console.error('Error al obtener mascotas:', err);
    setErrorMascotas("No se pudieron cargar las mascotas.");
    return [];
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

    const obtenerMascotaPorId = async (id) => {
  try {
    const response = await fetch(`https://tp2-backend-production-eb95.up.railway.app/pets/${id}`);
    const data = await response.json();
    return data.message; 
  } catch (error) {
    console.error("Error al obtener mascota por ID:", error);
    return null;
  }
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

const editarPublicacion = async (mascotaId, datosActualizados) => {
  try {
    const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/pets/${mascotaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al editar publicación:", error);
  }
};


const eliminarMascota = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la mascota');
    }

   
    setMascotas((prevMascotas) => prevMascotas.filter((m) => m.id !== id));

    return true;
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    return false;
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
        publicarMascota,
        editarPublicacion,
        eliminarMascota
        }}
    >
    {children}
    </MascotasContext.Provider>
    );
};