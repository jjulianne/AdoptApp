import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Inicio", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="buscar" 
        options={{ 
          title: "Buscar", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="publicar" 
        options={{ 
          title: "Publicar", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="add-outline" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="servicios" 
        options={{ 
          title: "Servicios", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} /> 
        }} 
      />
    </Tabs>
  )
}

export default TabsLayout
