import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "styled-components";

import IosHeaderLeft from "@/components/layout/IosHeaderLeft";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerLeft: () => (Platform.OS === "ios" ? <IosHeaderLeft /> : null),

        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Custom Tokens" }} />
      <Stack.Screen
        name="add-custom-token"
        options={{ title: "Add custom tokens" }}
      />
    </Stack>
  );
}
