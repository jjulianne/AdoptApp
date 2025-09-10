import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';

export default function LoginScreen() {
  const { login, register } = useAuth();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [esLogin, setEsLogin] = useState(true);

  const handleSubmit = async () => {
    if (!usuario || !password || (!esLogin && (!email || !phone))) {
      Alert.alert('Faltan datos', 'Por favor completá todos los campos.');
      return;
    }

    if (esLogin) {
      const result = await login(usuario, password);
      if (result.success) {
        Alert.alert(
          '¡Bienvenido/a! 🎉',
          'Has iniciado sesión con éxito.',
          [{ text: '¡Genial!' }]
        );
      } else {
        Alert.alert('Error', result.message);
      }
    } else {
      try {
        const result = await register({ usuario, email, password, phone });
        if (result.success) {
          Alert.alert(
            '¡Bienvenido/a! 🎉',
            'Tu cuenta se creó con éxito. ¡Ya estás entrando!',
            [
              {
                text: '¡Genial!',
                onPress: () => setTimeout(() => login(usuario, password), 500),
              },
            ]
          );
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo completar el registro.');
      }
    }
  };

    const toggleModo = () => setEsLogin(!esLogin);

    const forgotPassword = () => {
    Alert.alert("Recuperar contraseña", "En el futuro, enviaremos un SMS para restablecer tu contraseña.");
  };


  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={64} color="#aaa" />
      </View>

      <Text style={styles.title}>{esLogin ? 'Inicia sesión' : 'Registrate'}</Text>
      <Text style={styles.subtitle}>
        {esLogin ? 'Ingresá tus credenciales' : 'Completá tus datos para crear una cuenta'}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Usuario</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-circle-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            placeholder="Nombre de usuario"
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
          />
        </View>

        {!esLogin && (
          <>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="correo@ejemplo.com"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={styles.inputLabel}>Teléfono</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="+54 11 1234 5678"
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </>
        )}

        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {esLogin && (
        <Pressable onPress={forgotPassword} style={{ alignSelf: 'flex-end', marginBottom: 18 }}>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      )}

      <Pressable style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginText}>{esLogin ? 'Ingresar' : 'Registrarme'}</Text>
      </Pressable>

      <Pressable onPress={toggleModo}>
        <Text style={styles.toggleText}>
          <Text style={styles.toggleTextBlack}>
            {esLogin ? '¿No tenés cuenta? ' : '¿Ya tenés cuenta? '}
          </Text>
          <Text style={styles.toggleTextColored}>
            {esLogin ? 'Registrate' : 'Iniciá sesión'}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 2,
  },
  inputLabel: {
    marginBottom: 6,
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  toggleTextBlack: {
    color: '#000',
  },
  toggleTextColored: {
    color: '#007AFF',
  },
  forgot: {
    color: '#666',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
