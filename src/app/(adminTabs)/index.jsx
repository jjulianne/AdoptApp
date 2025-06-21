import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const AdminIndex = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué querés administrar hoy?</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(adminTabs)/mascotas')}>
        <Text style={styles.buttonText}>Mascotas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(adminTabs)/usuarios')}>
        <Text style={styles.buttonText}>Usuarios</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => router.push('/(adminTabs)/solicitudes')}>
        <Text style={styles.buttonText}>Ver solicitudes de adopcion </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});

export default AdminIndex;
