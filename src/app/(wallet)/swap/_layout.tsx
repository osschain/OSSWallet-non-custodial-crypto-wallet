import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";

export default function _layout() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: theme.colors["bg-primary"] },
        headerTintColor: theme.colors["text-primary"],

        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: t("wallet.swap.index.title") }}
      />
      <Stack.Screen
        name="swap-in-progress"
        options={{
          headerShown: false,
          title: t("wallet.swap.swap-in-progress.title"),
        }}
      />
    </Stack>
  );
}
