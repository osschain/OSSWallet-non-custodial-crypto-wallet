import { AntDesign } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useTheme } from "styled-components/native";

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
              <AntDesign
                onPress={() => router.push("(wallet)/home/custom-token")}
                name="plus"
                size={24}
                color="black"
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
