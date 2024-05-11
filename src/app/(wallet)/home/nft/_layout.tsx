import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

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
    />
  );
}