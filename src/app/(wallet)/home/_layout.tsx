import { Stack } from "expo-router";

import { useStackOptions } from "@/hooks/useStackOptions";

export default function _layout() {
  const stackOptions = useStackOptions();
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="recieve" options={{ headerShown: false }} />
      <Stack.Screen name="send" options={{ headerShown: false }} />
      <Stack.Screen name="asset" options={{ headerShown: false }} />
      <Stack.Screen name="swap" options={{ headerShown: false }} />
      <Stack.Screen name="nft" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />

      <Stack.Screen name="custom-token" options={{ headerShown: false }} />
    </Stack>
  );
}
