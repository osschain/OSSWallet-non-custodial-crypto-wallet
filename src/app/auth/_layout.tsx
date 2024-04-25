import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
  const { masterKey } = useAuth();

  if (masterKey) {
    return <Redirect href="/" />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
