import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CardServicios({ item }) {
  const router = useRouter();

  const handlePress = () => {
    console.log("Card clickeada:", item);
    if (item?.id) {
      router.push(`/servicios/${item.id}`);
    } else {
      console.warn("Servicio sin ID válido:", item);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>[Imagen del servicio]</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.serviceType ?? item.servicio ?? item.type}</Text>
        <Text style={styles.descripcion}>{item.descripcion ?? item.description}</Text>

        <View style={styles.detalles}>
          <View style={styles.item}>
            <FontAwesome name="star" size={16} color="orange" />
            <Text style={styles.itemText}>{item.rating || "4.9"}</Text>
          </View>
          <View style={styles.item}>
            <Ionicons name="location" size={16} color="#444" />
            <Text style={styles.itemText}>{item.ubicacion ?? item.location ?? "Cerca"}</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome name="dollar" size={16} color="#444" />
            <Text style={styles.itemText}>${item.precio ?? item.price ?? "1400"}</Text>
          </View>
        </View>

        {/* Cambiamos esto por un View, como ya hicimos */}
        <View style={styles.button}>
          <Text style={styles.buttonText}>Contactar</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#888",
    fontStyle: "italic",
  },
  info: {
    padding: 15,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  descripcion: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginBottom: 15,
    lineHeight: 20,
  },
  detalles: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    paddingVertical: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#444",
  },
  button: {
    backgroundColor: "#E53935",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 10,
  },
  buttonText: {
    color: "#fff",
  fontSize: 16,
  fontWeight: "600",
  },
});
