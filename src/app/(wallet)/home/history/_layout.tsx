import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

import IosHeaderLeft from "@/components/layout/IosHeaderLeft";

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

        headerLeft: () => (Platform.OS === "ios" ? <IosHeaderLeft /> : null),
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: t("wallet.home.history.index.title") }}
      />
      <Stack.Screen
        name="[slug]"
        options={{ title: t("wallet.home.history.slug.title") }}
      />
    </Stack>
  );
}
