import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authContext";

export default function DetalleServicio() {
  const { servicioId } = useLocalSearchParams();
  const router = useRouter();
  const [servicio, setServicio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:8080/services/${servicioId}`);
        const data = await res.json();
        setServicio(data);
      } catch (error) {
        console.error("Error al cargar servicio", error);
      } finally {
        setCargando(false);
      }
    };

    if (servicioId) {
      fetchServicio();
    }
  }, [servicioId]);

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text>Cargando servicio...</Text>
      </View>
    );
  }

  if (!servicio) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo cargar el servicio.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{servicio.servicio ?? servicio.type}</Text>
        <Text style={styles.desc}>
          {(servicio.descripcion ?? servicio.description) || "Sin descripción"}
        </Text>
        <Text style={styles.info}>
          Precio: ${servicio.precio ?? servicio.price ?? "Sin precio"}
        </Text>
        <Text style={styles.info}>
          Ubicación: {servicio.ubicacion ?? servicio.location}
        </Text>
        <Text style={styles.info}>Rating: ⭐ {servicio.rating ?? "N/A"}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Contacto en construcción")}
        >
          <Text style={styles.buttonText}>📞 Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (!user) {
              alert("Debes estar logueado para reservar");
              return;
            }
            try {
              const res = await fetch("http://10.0.2.2:8080/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  serviceId: servicio.id,
                  clienteId: user.id,
         //       fechaReserva: new Date().toISOString(),
       //         comentarioCliente: "¡Quiero reservar este servicio!",
                }),
              });
              if (res.ok) {
                alert("¡Reserva realizada con éxito!");
              } else {
                alert("No se pudo realizar la reserva");
              }
            } catch (error) {
              alert("Error de conexión");
            }
          }}
        >
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
