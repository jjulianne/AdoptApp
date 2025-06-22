import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const ServiciosContext = createContext();
export const useServicios = () => useContext(ServiciosContext);

export const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [errorServicios, setErrorServicios] = useState(null);
  const { user } = useAuth();


  const API_URL = "https://tp2-backend-production-eb95.up.railway.app/services";
 

  // Función para obtener todos los servicios
  const fetchServicios = async () => {
    setLoadingServicios(true);
    setErrorServicios(null);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Error al cargar los servicios: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setServicios(data.message || data); // Ajustá según tu estructura de respuesta

    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setErrorServicios(
        "No se pudieron cargar los servicios. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoadingServicios(false);
    }
  };

  // Efecto para cargar los servicios al inicio
  useEffect(() => {
    fetchServicios();
  }, []);

  // Función para crear un nuevo servicio
  const crearServicio = async ({ serviceTypeId, description, price, location }) => {
    try {
      const nuevoServicio = {
        serviceTypeId,
        description,
        price: Number(price),
        location,
        userId: user?.id,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoServicio)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear servicio');
      }

      const servicioGuardado = await response.json();
      setServicios(prev => [servicioGuardado.message || servicioGuardado, ...prev]);
      
      return { success: true, data: servicioGuardado };
    } catch (error) {
      console.error("Error al crear servicio:", error);
      return { success: false, error: error.message };
    }
  };

  // Función para obtener un servicio por ID
  const obtenerServicioPorId = (id) => {
    return servicios.find((servicio) => servicio.id === id);
  };

  // Función para actualizar un servicio
  const actualizarServicio = async (id, datosActualizados) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar servicio');
      }

      const servicioActualizado = await response.json();
      setServicios(prev => 
        prev.map(servicio => 
          servicio.id === id ? servicioActualizado.message || servicioActualizado : servicio
        )
      );

      return { success: true, data: servicioActualizado };
    } catch (error) {
      console.error("Error al actualizar servicio:", error);
      return { success: false, error: error.message };
    }
  };

  // Función para eliminar un servicio
  const eliminarServicio = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar servicio');
      }

      setServicios(prev => prev.filter(servicio => servicio.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        loadingServicios,
        errorServicios,
        fetchServicios,
        crearServicio,
        obtenerServicioPorId,
        actualizarServicio,
        eliminarServicio
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};