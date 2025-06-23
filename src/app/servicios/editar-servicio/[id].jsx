import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../context/authContext";
import { Picker } from "@react-native-picker/picker";

export default function EditarServicio() {
  const { id } = useLocalSearchParams();
  const [tipoServicioId, setTipoServicioId] = useState(null);
  const [tiposServicio, setTiposServicio] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [barrio, setBarrio] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await fetch(
          "https://tp2-backend-production-eb95.up.railway.app/services/servicetypes"
        );
        const data = await res.json();
        if (Array.isArray(data.message)) {
          setTiposServicio(data.message);
        }
      } catch (error) {
        console.error("Error al cargar tipos de servicio:", error);
      }
    };

    fetchTipos();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`https://tp2-backend-production-eb95.up.railway.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const servicio = data.message;
        console.log("📦 Servicio recibido:", data);
        console.log(
          "🆔 Comparación: servicio.userId =",
          data.userId,
          "| user.id =",
          user.id
        );

        if (String(servicio.userId) !== String(user.id)) {
          Alert.alert("No autorizado", "No podés editar este servicio.");
          router.replace("/servicios/indexServicios");
          return;
        }

        setTipoServicioId(servicio.serviceTypeId);
        setDescripcion(servicio.description);
        setPrecio(String(servicio.price));
        const partes = servicio.location.split(",");
        setBarrio(partes[0]?.trim() || "");
        setCiudad(partes[1]?.trim() || "");
      })
      .catch(() => Alert.alert("Error", "No se pudo cargar el servicio"));
  }, [id, user]);

  const handleUpdate = async () => {
    if (!tipoServicioId || !descripcion || !precio || !barrio) {
      Alert.alert("Faltan datos", "Completá todos los campos.");
      return;
    }

    const location = `${barrio.trim()}, ${ciudad.trim()}, Argentina`;

    try {
      await fetch(
        `https://tp2-backend-production-eb95.up.railway.app/services/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceTypeId: tipoServicioId,
            description: descripcion,
            price: Number(precio),
            location,
          }),
        }
      );

      Alert.alert("Servicio actualizado correctamente");
      router.replace("/servicios/indexServicios");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar el servicio.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Editar Servicio</Text>

      <Text style={styles.label}>Tipo de Servicio</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={tipoServicioId}
          onValueChange={(itemValue) => setTipoServicioId(itemValue)}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccionar servicio"
            value={null}
            enabled={false}
          />
          {tiposServicio.map((tipo) => (
            <Picker.Item key={tipo.id} label={tipo.name} value={tipo.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Describe brevemente tu servicio"
        multiline
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Ej. 1500"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Barrio</Text>
      <TextInput
        style={styles.input}
        value={barrio}
        onChangeText={setBarrio}
        placeholder="Ej. Palermo"
      />
      <Text style={styles.label}>Ciudad</Text>
      <Text style={styles.valorFijo}>Buenos Aires</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
        <Text style={styles.primaryText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.volverButton}
        onPress={() => router.replace('/(tabs)/servicios')}
      >
        <Text style={styles.volverText}>← Volver a Servicios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9fafb",
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    marginBottom: 16,
    color: "#111",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  valorFijo: {
    backgroundColor: "#e5e7eb",
    color: "#444",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  volverButton: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  volverText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
