import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors["bg-primary"] },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="seed-creating" options={{ headerShown: false }} />
      <Stack.Screen name="seed-back-uping" options={{ headerShown: false }} />
      <Stack.Screen name="seed-checking" options={{ headerShown: false }} />
      <Stack.Screen name="password-setup" options={{ headerShown: false }} />
      <Stack.Screen name="congretulation" options={{ headerShown: false }} />
      <Stack.Screen name="enter-password" options={{ headerShown: false }} />
    </Stack>
  );
}
