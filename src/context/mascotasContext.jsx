import { createContext, useContext, useEffect, useState } from "react";

const MascotasContext = createContext();
export const useMascotas = () => useContext(MascotasContext);

export const MascotasProvider = ({ children }) => {
    const [mascotas, setMascotas] = useState([]);
    const [loadingMascotas, setLoadingMascotas] = useState(true);
    const [errorMascotas, setErrorMascotas] = useState(null);

    const API_URL = "https://683644b2664e72d28e404ea3.mockapi.io/pets";

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

    const mascotasDisponibles = await Promise.all(
        data
            .filter((mascota) => !mascota.adopted)
            .map(async (mascota) => {
            const tipo = Math.random() < 0.5 ? "perro" : "gato";
            let imagen = "";

            if (tipo === "perro") {
            try {
                const res = await fetch(
                    "https://dog.ceo/api/breeds/image/random"
                );
                const json = await res.json();
                imagen = json.message;
            } catch (error) {
                console.error("Error obteniendo imagen de perro", error);
                imagen = `https://placedog.net/400/300?id=${mascota.id}`;
            }
            } else {
                imagen = "https://cataas.com/cat";
            }

            return {
                ...mascota,
                type: tipo,
                photo: imagen,
            };
            })
    );

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

    return (
    <MascotasContext.Provider
        value={{
        mascotas,
        loadingMascotas,
        errorMascotas,
        fetchMascotas,
        adoptarMascota,
        obtenerMascotaPorId,
        }}
    >
    {children}
    </MascotasContext.Provider>
    );
};