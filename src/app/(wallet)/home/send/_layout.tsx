import { getHeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import SecondHeader from "@/components/layout/SecondHeader";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Send" }} />
    </Stack>
  );
}
