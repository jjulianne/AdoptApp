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
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { Picker } from "@react-native-picker/picker";

export default function CrearServicio() {
  const [tipoServicioId, setTipoServicioId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [barrio, setBarrio] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const [tiposServicio, setTiposServicio] = useState([]);

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

  const handleSubmit = async () => {
    if (!tipoServicioId || !descripcion || !precio || !ciudad || !barrio) {
      Alert.alert("Faltan datos", "Completá todos los campos.");
      return;
    }

    // Acá creás la variable location
    const location = `${barrio.trim()}, Buenos Aires, Argentina`;
    console.log("Dirección enviada:", location);

    const nuevoServicio = {
      serviceTypeId: tipoServicioId,
      description: descripcion,
      price: Number(precio),
      location, // para poder geolocalizar el servicio
      userId: user?.id,
    };

    try {
      await fetch(
        "https://tp2-backend-production-eb95.up.railway.app/services",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoServicio),
        }
      );

      Alert.alert("Servicio creado exitosamente");
      router.replace("/servicios");
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      Alert.alert("Error", "No se pudo crear el servicio.");
    }
  };
  console.log("Tipos de servicio:", tiposServicio);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Crear Servicio</Text>

      <Text style={styles.label}>Tipo de Servicio</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={tipoServicioId}
          onValueChange={(itemValue) => setTipoServicioId(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar tipo..." value="" />
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

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryText}>Crear Servicio</Text>
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

  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    marginBottom: 16,
    justifyContent: "center",
    height: 52, // igual que un input
  },

  picker: {
    color: "#111",
    fontSize: 16,
    height: 50,
  },
});
