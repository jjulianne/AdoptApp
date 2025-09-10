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
        const token = await AsyncStorage.getItem("token");

        // si tenemos token e isAuthenticated, vamos directo al /me
        if (isAuthenticated === 'true' && token) {
        try {
          const response = await fetch("https://tp2-backend-production-eb95.up.railway.app/users/me", {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();

          if (response.ok && data.user) {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (compatible && enrolled) {
              const results = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Verifica tu identidad',
                fallbackLabel: "Usar contraseña",
                cancelLabel: "Cancelar"
              });

              if (!results.success) throw new Error("Biometría fallida");
            }

            await AsyncStorage.setItem("userData", JSON.stringify(data.user));
            setUser(data.user);
            setIsAuth(true);
            setStatus('authenticated');
          } else {
            throw new Error("Token inválido");
          }
        } catch (error) {
          // si el token no corresponde, lo limpiamos todo
          await AsyncStorage.multiRemove(["isAuthenticated", "userData", "token"]);
          setUser(null);
          setIsAuth(false);
          setStatus('unauthenticated');
        }
      } else {
        await AsyncStorage.multiRemove(["isAuthenticated", "userData", "token"]);
        setUser(null);
        setIsAuth(false);
        setStatus('unauthenticated');
      }
    };

    cargarEstadoAuth();
  }, []);


// login adaptado al backend nuevo con JWT
const login = async (usuario, password) => {
  try {
      const response = await fetch("https://tp2-backend-production-eb95.up.railway.app/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: usuario, // con los cambios en el back ahora se puede ingresar con mail o username
          pass: password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("isAuthenticated", "true");

        // Consultamos /me para obtener info del usuario
        const meResponse = await fetch("https://tp2-backend-production-eb95.up.railway.app/users/me", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          }
        });

        const meData = await meResponse.json();

        if (meResponse.ok && meData.user) {
          await AsyncStorage.setItem("userData", JSON.stringify(meData.user));
          setUser(meData.user);
          setIsAuth(true);
          setStatus('authenticated');
          return { success: true, message: 'Login exitoso 👌' };
        } else {
          return { success: false, message: 'Error obteniendo usuario' };
        }
      } else {
        return { success: false, message: data.message || 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: 'Error en la autenticación' };
    }
  };

const register = async ({usuario, email, password, phone}) => {
  try {
    console.log("Datos que se envían:", { usuario, email, password, phone }); 
    const response = await fetch('https://tp2-backend-production-eb95.up.railway.app/users');
    const data = await response.json();
    
    const users = data.data || []; 
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

//  ahora el logout tambien elimina el token
const logout = async () => {
  await AsyncStorage.removeItem("isAuthenticated");
  await AsyncStorage.removeItem("userData");
  await AsyncStorage.removeItem("token");
  setUser(null);
  setStatus("unauthenticated");
  setIsAuth(false);
  router.replace('/login');
};


// token en headers
const updateUser = async (datosActualizados) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const body = {
      ...user,
      ...datosActualizados
    };

    console.log("DATOS ACTUALIZADOS",body)

    const response = await fetch(`https://tp2-backend-production-eb95.up.railway.app/users/${user.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
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
