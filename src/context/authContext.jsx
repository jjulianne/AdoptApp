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

    const response = await fetch('https://tp2-backend-production-eb95.up.railway.app/users');
    console.log("Response status:", response.status);
    const data = await response.json();

    const users = data.message; 

    console.log("DATA:", users[0].pass);

    const user = users.find(
      u =>
        u?.username?.trim().toLowerCase() === usuario.trim().toLowerCase() &&
        u?.pass === password
    );

    if (user) {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      setUser(user);
      setIsAuth(true);
      setStatus('authenticated');
      return { success: true, message: 'Login exitoso 👌' };
    } else {
      setStatus('unauthenticated');
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
  } catch (error) {
    console.error(error);
    setStatus('unauthenticated');
    return { success: false, message: 'Error en la autenticación' };
  }
};

const register = async ({usuario, email, password, phone}) => {
  try {
    console.log("Datos que se envían:", { usuario, email, password, phone }); 
    const response = await fetch('https://tp2-backend-production-eb95.up.railway.app/users');
    const data = await response.json();
    
    const users = data.message; 
    const userExist = users.some(u => u.username === usuario);
    const emailExist = users.some(u => u.email === email);
    const phoneExist = users.some(u => u.phone === phone);
    console.log("pass" + users.pass)

    if (userExist) {
      return { success: false, message: 'Usuario ya registrado' };
    } else if (emailExist) {
      return { success: false, message: 'Email ya registrado' };
    } else if (phoneExist) {
      return { success: false, message: 'Teléfono ya registrado' };
    } else {
      const body = JSON.stringify({
        email: email,
        username: usuario,
        pass: password,
        avatar: "", 
        location: "",
        phone: phone,
        isAdmin: false,
      });

      const respuesta = await fetch('https://tp2-backend-production-eb95.up.railway.app/users', {
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
        return { success: true, message: 'Registro exitoso' };
      } else {
        return { success: false, message: 'Error al registrar el usuario' };
      }
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error en la autenticación' };
  }
};

const logout = async () => {
  await AsyncStorage.removeItem("isAuthenticated");
  await AsyncStorage.removeItem("userData");
  setUser(null);
  setStatus("unauthenticated");
  setIsAuth(false);
};

const updateUser = async (datosActualizados) => {
  try {
    const body = {
      ...user,
      ...datosActualizados
    };

    console.log("DATOS ACTUALIZADOS",body)

    const response = await fetch(`https://tp2-backend-production-eb95.up.railway.app/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Error al actualizar');

    const updatedUser = await response.json();
    console.log("UPDATE USER ",updatedUser)

    if (!updatedUser.data) throw new Error('Respuesta sin "data"');

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUser.data));
    setUser(updatedUser.data);

    return { success: true };
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return { success: false, message: error.message };
  }
};

return (
    <AuthContext.Provider value={{isAuth, login, logout, register, user, status, updateUser}}>
        {children}
    </AuthContext.Provider>
);
}
