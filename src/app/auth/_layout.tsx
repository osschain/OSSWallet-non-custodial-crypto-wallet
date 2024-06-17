import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

export default function AuthLayout() {
  const theme = useTheme();
  const { currentMode } = useStyledTheme();
  const { encryptedMnemonic, mnemonic } = useAuth();
  if (encryptedMnemonic && !mnemonic) {
    return <Redirect href="/enter-password" />;
  }

  if (mnemonic && encryptedMnemonic) {
    return <Redirect href="/(wallet)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors["bg-primary"] },
        headerTintColor: theme.colors["text-primary"],

        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
        headerShadowVisible: false,
        title: "",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mnemonic-creating" />
      <Stack.Screen name="mnemonic-back-uping" />
      <Stack.Screen name="mnemonic-checking" />
      <Stack.Screen name="password-setup" />
      <Stack.Screen name="wallet-creating" options={{ headerShown: false }} />
      <Stack.Screen name="auth-error" options={{ headerShown: false }} />
      <Stack.Screen name="congretulation" options={{ headerShown: false }} />
      <Stack.Screen name="connect-wallet" />
      <StatusBar style={currentMode === "dark" ? "light" : "dark"} />
    </Stack>
  );
}
