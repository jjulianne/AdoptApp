import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

//creacion del contexto y el hook
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(null)
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('checking') // haya 3 tipos de estados, checking, authenticado y unauthenticated

    useEffect(() => {

         
    const cargarEstadoAuth = async () => {
        const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
        const userData = await AsyncStorage.getItem("userData");

        if (isAuthenticated === 'true' && userData) {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (compatible && enrolled) {
                const results = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Verifica tu identidad',
                    fallbackLabel: "Usar contraseña",
                    cancelLabel: "Cancelar"
                });

                if (results.success) {
                    setUser(JSON.parse(userData));
                    setStatus('authenticated');
                    setIsAuth(true);
                } else {
                    await AsyncStorage.multiRemove(["isAuthenticated", "userData"]);
                    setUser(null);
                    setStatus('unauthenticated');
                    setIsAuth(false);
                }
            } else {
                setUser(JSON.parse(userData));
                setStatus('authenticated');
                setIsAuth(true);
            }
        } else {
            
            await AsyncStorage.multiRemove(["isAuthenticated", "userData"]);
            setUser(null);
            setStatus('unauthenticated');
            setIsAuth(false);
        }
    };

    cargarEstadoAuth();
}, []);



    const login = async (usuario, password) => {
        try {
            console.log('Iniciando Login');
            
            const response = await fetch('https://683ba22b28a0b0f2fdc514df.mockapi.io/users');
            const data = await response.json()
            
            console.log("Usuario ingresado:", usuario);
console.log("Password ingresado:", password);
 
             const user = data.find(
  u => u.username.trim().toLowerCase() === usuario.trim().toLowerCase() &&
       u.password === password
);

            
                         


            if(user){
                await AsyncStorage.setItem('isAuthenticated', 'true')
                await AsyncStorage.setItem('userData', JSON.stringify(user))
                setUser(user)
                setIsAuth(true)
                setStatus('authenticated')
            }else{
                alert('Usuario o password incorrectos')
                setStatus('unauthenticated')
            }
        } catch (error) {
            console.error(error)
            alert('Error en la authenticacion')
            setStatus('unauthenticated')
        }
    }


const register = async ({usuario, email, password}) => {
  try {
    
    const response = await fetch('https://683ba22b28a0b0f2fdc514df.mockapi.io/users');
    const data = await response.json();

    console.log("USUARIO"+usuario)
    console.log("PASSWORD"+password)

   
    const userExist = data.some(u => u.username === usuario);
    const emailExist = data.some(u => u.email === email);

    if (userExist) {
      alert('Usuario ya registrado');
    } else if (emailExist) {
      alert('Email ya registrado');
    } else {
      const body = JSON.stringify({
        email: email,
        username: usuario,
        password: password,
        avatar: ""
      });

      const respuesta = await fetch('https://683ba22b28a0b0f2fdc514df.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      });

     

      const json = await respuesta.json();
       console.log("respuesta "+json.username)
      console.log("Respuesta del registro:", json);

      if (respuesta.ok) {
        alert('Registro Exitoso');
      } else {
        alert('Error al registrar el usuario');
      }
    }

  } catch (error) {
    console.error(error);
    alert('Error en la autenticación');
  }
};



    const logout = async () => {
  await AsyncStorage.removeItem("isAuthenticated");
  await AsyncStorage.removeItem("userData");
  setUser(null);
  setStatus("unauthenticated");
  setIsAuth(false);
};


    return (
        <AuthContext.Provider value={{isAuth, login, logout, register,status}}>
            {children}
        </AuthContext.Provider>
    )
}