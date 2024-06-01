import { Entypo, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function TabLayout() {
  const { mnemonic, encryptedMnemonic } = useAuth();
  const theme = useTheme();
  if (!mnemonic && !encryptedMnemonic) {
    return <Redirect href="/auth/" />;
  }

  if (!mnemonic && encryptedMnemonic) {
    return <Redirect href="/password-setup" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors["text-primary"],
          tabBarInactiveTintColor: theme.colors["text-second"],
        }}
        sceneContainerStyle={{
          backgroundColor: theme.colors["bg-primary"],
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ color }) => (
              <Entypo
                size={pixelToNumber(theme.sizes["xl"])}
                name="wallet"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="swap"
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="swap-horizontal"
                size={pixelToNumber(theme.sizes["xl"])}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="settings"
                size={pixelToNumber(theme.sizes["xl"])}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
      <StatusBar />
    </>
  );
}
