import React, { useState } from 'react'
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { useAuth } from '../context/authContext'

export default function LoginScreen() {

    const { login, register } = useAuth();

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [esLogin, setEsLogin] = useState(true)

    const handleSubmit = () => {
        if(esLogin){
            login(usuario, password)
        }else{
            register(usuario, email, password)
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esLogin ? 'Login' : 'Register'}</Text>
            <Text>Usuario: </Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu Usuario'
                value={usuario}
                onChangeText={setUsuario}
            />
            {
                !esLogin && (
                    <>
                        <Text>Email: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ingresa tu Email'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </>
                )
            }
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu Contraseña'
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.register}>
            <Button title={esLogin ? 'Login' : 'Register' } onPress={handleSubmit} />
            </View>
            <View>
                <Text>{esLogin ? "No tienes cuenta? Registrate" : 'Ya tienes cuenta? logeate'}</Text>
                <Switch value={esLogin} onValueChange={setEsLogin}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  register: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#555',
  },
})
