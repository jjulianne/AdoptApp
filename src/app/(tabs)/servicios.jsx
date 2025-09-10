import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import CardServicios from "../../components/cardServicios";
import { useLocation } from "../../utils/useLocation";
import { reverseGeocodeLocation } from "../../utils/geocode";

export default function Servicios() {
  const [tiposUnicos, setTiposUnicos] = useState([]);
  const [tipoServicio, setTipoServicio] = useState("todos");
  const { location, errorMsg, isLoading } = useLocation();
  const [ubicacionNombre, setUbicacionNombre] = useState("Cargando...");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const res = await fetch(
          "https://tp2-backend-production-eb95.up.railway.app/services"
        );
        const data = await res.json();
        console.log("Respuesta del backend:", data);
        const serviciosCargados = Array.isArray(data.message) ? data.message : [];
       
setServicios(serviciosCargados);

const tipos = [...new Set(serviciosCargados.map((s) => s.serviceType?.toLowerCase()))];
console.log("Tipos únicos detectados:", tipos);
setTiposUnicos(tipos.filter(Boolean));
      } catch (e) {
        console.error("Error al cargar servicios", e);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setLoading(false);
      }
    };

    cargarServicios();
  }, []);

  useEffect(() => {
    const fetchUbicacion = async () => {
      if (!location?.latitude || !location?.longitude) return;

      const nombre = await reverseGeocodeLocation(
        location.latitude,
        location.longitude
      );
      setUbicacionNombre(nombre);
    };

    fetchUbicacion();
  }, [location]);

  const serviciosFiltrados = servicios.filter((s) => {
    const matchTipo =
      tipoServicio && tipoServicio !== "todos"
        ? s.serviceType?.toLowerCase() === tipoServicio.toLowerCase()
        : true;

    const matchDescripcion = s.description
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchTipo && matchDescripcion;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Ubicacion */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.addressContainer}
            onPress={() => router.push("/maps")}
          >
            <Ionicons name="location-sharp" size={18} color="#FF0000" />
            <Text style={styles.addressText} numberOfLines={1}>
              {ubicacionNombre}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color="#444"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Busqueda */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons
              name="search"
              size={20}
              color="#777"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar en servicios..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Selector de tipo de servicio */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Tipos de servicios:</Text>

          <View style={styles.botonesFila}>
            <TouchableOpacity
              onPress={() => router.push("/servicios/indexServicios")}
              style={styles.crearServicioButton}
            >
              <Text style={styles.crearServicioTexto}>🧾 Mis Servicios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/crear/crearservicio")}
              style={styles.crearServicioButton}
            >
              <Text style={styles.crearServicioTexto}>+ Crear Servicio</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.selectorButtons}>
            {/* Botón "Todos" */}
            <TouchableOpacity
              style={[
                styles.selectorButton,
                (tipoServicio === "todos" || tipoServicio === "") &&
                  styles.selectorButtonActivo,
              ]}
              onPress={() => setTipoServicio("todos")}
            >
              <Text style={styles.selectorTexto}>Todos</Text>
            </TouchableOpacity>

            {/* Botones generados dinámicamente desde la base */}
            {tiposUnicos.map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={[
                  styles.selectorButton,
                  tipoServicio === tipo && styles.selectorButtonActivo,
                ]}
                onPress={() =>
                  setTipoServicio(tipoServicio === tipo ? "todos" : tipo)
                }
              >
                <Text style={styles.selectorTexto}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tarjetas */}
        <FlatList
          data={serviciosFiltrados}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
          renderItem={({ item }) => <CardServicios item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  // --- Ubicacion ---
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  // --- Barra de Busqueda ---
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 5,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  searchButton: {
    backgroundColor: "#FF0000",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectorContainer: {
    marginBottom: 15,
    marginTop: 10,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  selectorButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  selectorButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  selectorButtonActivo: {
    backgroundColor: "#000",
  },
  selectorTexto: {
    color: "#fff",
    fontWeight: "600",
  },
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
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  crearServicioButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  crearServicioTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  botonesFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
});
