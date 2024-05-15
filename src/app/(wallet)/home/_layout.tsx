import { Stack, router } from "expo-router";
import { useTheme } from "styled-components/native";

import IconUi from "@/components/ui/IconUi";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          contentStyle: {
            backgroundColor: theme.colors["bg-primary"],
          },
          headerRight: () => {
            return (
              <IconUi
                library="AntDesign"
                name="plus"
                size="xl"
                color="icon-second"
                onPress={() => router.push("(wallet)/home/custom-token")}
              />
            );
          },
          title: "ossWallet",
        }}
      />
      <Stack.Screen name="recieve" options={{ headerShown: false }} />
      <Stack.Screen name="send" options={{ headerShown: false }} />
      <Stack.Screen name="asset" options={{ headerShown: false }} />
      <Stack.Screen name="swap" options={{ headerShown: false }} />
      <Stack.Screen name="nft" options={{ headerShown: false }} />
      <Stack.Screen name="custom-token" options={{ headerShown: false }} />

      <Stack.Screen
        name="history"
        options={{
          title: "History",
        }}
      />
    </Stack>
  );
}
