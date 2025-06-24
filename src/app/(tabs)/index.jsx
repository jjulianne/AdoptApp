import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.welcome}>¡Hola, {user.username}! 🐾</Text>
      )}

      <Text style={styles.title}>Bienvenido a <Text style={styles.highlight}>AdoptApp</Text></Text>

      <Text style={styles.quote}>
        "Adoptar es un acto de amor que cambia dos vidas: la suya y la tuya." 💛
      </Text>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>¿Sabías que…?</Text>
        <Text style={styles.tipText}>
          Las mascotas adoptadas pueden mejorar tu estado de ánimo, reducir el estrés y dar sentido a tu día. 🐶💖
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/mascotas')}
      >
        <Text style={styles.buttonText}>🐶 Ver mascotas en adopción</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#C62828' }]}
        onPress={() => router.push('/servicios')}
      >
        <Text style={styles.buttonText}>🩺 Ver servicios para mi mascota</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Gracias por ser parte de esta comunidad que salva vidas ❤️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fffaf8',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  title: {
    fontSize: 26,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  highlight: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  tipBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#ffeb3b',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    marginTop: 25,
    textAlign: 'center',
    color: '#888',
  },
});
