import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function IndexServicios() {
  const [servicios, setServicios] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) return;

    console.log("👤 Usuario logueado:", user);
    console.log(
      "🛠️ URL de fetch:",
      `https://tp2-backend.../services?userId=${user?.id}`
    );

    fetch(
      `https://tp2-backend-production-eb95.up.railway.app/services?userId=${user.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.message)) {
          setServicios(data.message);
        } else {
          console.warn("Respuesta inesperada:", data);
          setServicios([]);
        }
      })
      .catch((err) => console.error("Error al obtener servicios:", err));
  }, [user]);

  const eliminarServicio = (id) => {
    Alert.alert("Eliminar Servicio", "¿Querés eliminar este servicio?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(
              `https://tp2-backend-production-eb95.up.railway.app/services/${id}`,
              {
                method: "DELETE",
              }
            );
            setServicios(servicios.filter((s) => s.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el servicio.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.type}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.meta}>
        💲 {item.price} | 📍 {item.location}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.botonEditar}
          onPress={() => router.push(`/servicios/editar-servicio/${item.id}`)}
        >
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => eliminarServicio(item.id)}
        >
          <Text style={styles.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Mis Servicios</Text>
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tenés servicios publicados aún.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    backgroundColor: "#F9FAFB",
    flex: 1,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1F2937",
  },
  meta: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  botonEditar: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  botonEliminar: {
    backgroundColor: "#EF4444",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  textoBoton: {
    color: "#FFF",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
  },
});
