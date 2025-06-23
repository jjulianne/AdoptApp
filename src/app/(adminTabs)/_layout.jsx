import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

const AdminTabsLayout = () => {
  const { user, isAuth } = useAuth();

  useEffect(() => {
    if (isAuth === false || !user?.isAdmin) {
      router.replace("/login");
    }
  }, [isAuth]);

  if (isAuth === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user?.isAdmin) return null;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Salir",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
  name="mascotasAdmin"
  options={{
    title: "Mascotas",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="paw-outline" color={color} size={size} />
    ),
  }}
/>

<Tabs.Screen
  name="solicitudes"
  options={{
    title: "Solicitudes",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="list-outline" color={color} size={size} />
    ),
  }}
/>
    </Tabs>
    
  );
};

export default AdminTabsLayout;
