import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function Perfil() {
  const { user, logout } = useAuth();
  const router = useRouter();

 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.profileTitle}>Perfil</Text>
        </View>

        {/* Información del perfil */}
        <View style={styles.profileInfoSection}>
          <View style={styles.profileImageContainer}>
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[
                  styles.profileImage,
                  {
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={{ color: "#fff" }}>Sin foto</Text>
              </View>
            )}
          </View>
          <Text style={styles.profileName}>{user?.username || "usuario"}</Text>
          <Text style={styles.profileLocation}>
            {user?.location || "Ubicación no especificada"}
          </Text>
          {/* <Text style={styles.profileDescription}>
            {user?.description || 'Sin descripción aún.'}
          </Text>*/}

          {/* Botón para editar perfil */}
          <TouchableOpacity
            style={styles.redButton}
            onPress={() => router.push("/editar-perfil")}
          >
            <Text style={styles.redButtonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.redButton, styles.rowButton]}
              onPress={() => router.push("/servicios/indexServicios")}
            >
              <Text style={styles.redButtonText}>Mis Servicios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.redButton, styles.rowButton]}
              onPress={() => router.push("/mascotas/adoptadas")}
            >
              <Text style={styles.redButtonText}>Solicitudes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.redButton, styles.rowButton]}
              onPress={() => router.push("/mascotas/publicadas")}
            >
              <Text style={styles.redButtonText}>Mascotas Publicadas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cerrar sesión */}
        <View style={styles.signOutSection}>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.signOutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          <Text style={styles.appInfoText}>AdoptApp, versión beta 0.10.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F2F2F7" },
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: 15,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E2E2",
  },
  profileTitle: { fontSize: 20, fontWeight: "600", color: "#000" },
  profileInfoSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#E2E2E2",
  },
  changePictureButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 15,
    color: "#6A6A6A",
    marginBottom: 5,
  },
  profileDescription: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
    marginHorizontal: 40,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  signOutSection: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  signOutButtonText: {
    fontSize: 17,
    color: "#FF0000",
    fontWeight: "500",
    paddingVertical: 10,
  },
  appInfoText: {
    fontSize: 12,
    color: "#8A8A8E",
    textAlign: "center",
    marginTop: 5,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },

  redButton: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },

  redButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  thirdButton: {
    flex: 1,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  rowButton: {
    flex: 1,
    minWidth: 100, // opcional, para evitar que se achiquen demasiado
  },
});
