import { Stack, useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/authContext'
import { MascotasProvider } from '../context/mascotasContext'
import { SolicitudProvider } from '../context/solicitudesContext'
import { ServiciosProvider } from '../context/serviciosContext'

function ProtectedLayout() {

  const {isAuth} = useAuth()
  const {user} =useAuth()

  const segments = useSegments()
  const router = useRouter()
 
  useEffect(() => {

    if(isAuth === null || user == null) return;

    const inAuthGroup = segments[0] === 'login'

   if (!isAuth && !inAuthGroup) {
    router.replace('/login');
  } else if (isAuth && inAuthGroup) {
    if (user?.isAdmin) {
      router.replace('/(adminTabs)');
    } else {
      router.replace('/(tabs)');
    }
  }
  }, [isAuth, user,segments])
  

  return <Stack
    screenOptions={{
        headerShown: false,
    }}
  />
}


export default function LayoutPrincipal(){
  return (
    <AuthProvider>
      <MascotasProvider>
        <ServiciosProvider>
          <SolicitudProvider>

 <ProtectedLayout/>  

          </SolicitudProvider>
        </ServiciosProvider>
      </MascotasProvider>
    </AuthProvider>
  )
}