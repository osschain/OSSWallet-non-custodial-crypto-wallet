import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

import IosHeaderLeft from "@/components/layout/IosHeaderLeft";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors["bg-primary"] },
        headerTitleAlign: "center",
        headerTintColor: theme.colors["text-primary"],
        headerLeft: () => (Platform.OS === "ios" ? <IosHeaderLeft /> : null),
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    />
  );
}
