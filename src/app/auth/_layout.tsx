import { Redirect, Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
  const { masterKey } = useAuth();
  const theme = useTheme();
  if (masterKey) {
    return <Redirect href="/" />;
  }
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors["bg-primary"] },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="CreateWallet" options={{ headerShown: false }} />
    </Stack>
  );
}
