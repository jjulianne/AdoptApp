import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AdminTabsLayout = () => {
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
    </Tabs>
  );
};

export default AdminTabsLayout;
