import {View,Text,StyleSheet,TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";


export default function Home () {


const router = useRouter()

  return( <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a AdoptApp 🐾</Text>

      <Text style={styles.description}>
        AdoptApp es un lugar donde podés:
        {"\n"}- Adoptar mascotas según tus preferencias.
        {"\n"}- Buscar paseadores o veterinarias cerca tuyo.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/mascotas')}
      >
        <Text style={styles.buttonText}>🐶 Quiero adoptar una mascota</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/servicios')}
      >
        <Text style={styles.buttonText}>🩺 Necesito servicios para mi mascota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#444',
  },
  button: {
    backgroundColor: '#4f8cff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
