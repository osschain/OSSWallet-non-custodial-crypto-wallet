import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const { seed, encryptedSeed } = useAuth();
  const theme = useTheme();
  if (!seed && !encryptedSeed) {
    return <Redirect href="/auth/" />;
  }

  if (!seed && encryptedSeed) {
    return <Redirect href="/auth/password-setup" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors["text-primary"],
        tabBarInactiveTintColor: theme.colors["text-second"],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="wallet" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="swap"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="swap-horizontal" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
