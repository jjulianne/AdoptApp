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


       <TouchableOpacity style={styles.button} onPress={() => router.push('/servicios/admin')}>
        <Text style={styles.buttonText}>Servicios</Text>
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
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default AdminIndex;
