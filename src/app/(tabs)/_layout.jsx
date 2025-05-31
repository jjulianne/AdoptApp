import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
   
  return (
   
    <Tabs>
  <Tabs.Screen 
    name="index" 
    options={{ title: "Inicio", tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }} 
  />
 
  <Tabs.Screen 
    name="perfil" 
    options={{ title: "Perfil", tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }} 
  />
</Tabs>

  )
}

export default TabsLayout;