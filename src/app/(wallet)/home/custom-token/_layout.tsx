import { Stack } from "expo-router";
import { useTheme } from "styled-components";

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
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add-custom-token"
        options={{ title: "Add custom tokens" }}
      />
    </Stack>
  );
}
