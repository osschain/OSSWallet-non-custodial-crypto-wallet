import { Redirect, Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
  const { seed } = useAuth();
  const theme = useTheme();
  if (seed) {
    return <Redirect href="/" />;
  }
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors["bg-primary"] },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="wallet-create" options={{ headerShown: false }} />
    </Stack>
  );
}
