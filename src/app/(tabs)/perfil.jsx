import { View, Text, Button } from 'react-native';
import { useAuth } from '../../context/authContext';

export default function Perfil() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil en desarrollo</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
