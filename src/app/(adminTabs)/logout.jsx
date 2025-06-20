import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/authContext';

const AdminLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();              // limpiás el contexto y storage
    router.replace('/login');  // redirigís al login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Estás segurx que querés cerrar sesión?</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default AdminLogout;
