
import { createContext, useContext, useState, useEffect } from 'react';

const SolicitudContext = createContext();

export const SolicitudProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerSolicitudes = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://tp2-backend-production-eb95.up.railway.app/adoptionForm?estado=pendiente');
      const data = await res.json();
      setSolicitudes(data.message);
    } catch (err) {
      console.error('Error al obtener solicitudes:', err);
    } finally {
      setLoading(false);
    }
  };

const actualizarSolicitud = async (id, nuevoEstado) => {
  try {
    const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/adoptionForm/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });

  if (res.ok) {
  if (nuevoEstado === "aceptada") {
    alert("Solicitud aceptada, se notificara al usuario.");
  } else if (nuevoEstado === "rechazada") {
    alert("Solicitud rechazada.");
  }
  await obtenerSolicitudes(); 
}
  } catch (err) {
    console.error('Error al actualizar solicitud:', err);
  }
};

/*const rechazarSolicitud = async (id) => {
  try {
    const res = await fetch(`https://tp2-backend-production-eb95.up.railway.app/adoptionForm/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
        
      await obtenerSolicitudes();
    }
  } catch (err) {
    console.error('Error al rechazar solicitud:', err);
  }
};*/


  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  return (
    <SolicitudContext.Provider value={{
      solicitudes,
      loading,
      obtenerSolicitudes,
      actualizarSolicitud,
     
    }}>
      {children}
    </SolicitudContext.Provider>
  );
};

export const useSolicitudes = () => useContext(SolicitudContext);
