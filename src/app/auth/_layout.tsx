import { Redirect, Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
  const theme = useTheme();
  const { encryptedSeed, seed } = useAuth();

  if (encryptedSeed && !seed) {
    return <Redirect href="/enter-password" />;
  }

  if (seed && encryptedSeed) {
    return <Redirect href="/(wallet)" />;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
        headerShadowVisible: false,
        title: "",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="seed-creating" />
      <Stack.Screen name="seed-back-uping" />
      <Stack.Screen name="seed-checking" />
      <Stack.Screen name="password-setup" />
      <Stack.Screen name="wallet-creating" options={{ headerShown: false }} />
      <Stack.Screen name="congretulation" options={{ headerShown: false }} />
      <Stack.Screen name="connect-wallet" />
    </Stack>
  );
}
