import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useStackOptions } from "@/hooks/useStackOptions";
import { useAuth } from "@/providers/AuthProvider";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

export default function AuthLayout() {
  const { currentMode } = useStyledTheme();
  const stackOptions = useStackOptions();
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
        ...stackOptions,
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
