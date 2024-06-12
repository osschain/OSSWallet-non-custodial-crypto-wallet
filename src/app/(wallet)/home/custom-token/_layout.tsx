import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useTheme } from "styled-components";

import IosHeaderLeft from "@/components/layout/IosHeaderLeft";

export default function _layout() {
  const theme = useTheme();
  const { t } = useTranslation();
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
      <Stack.Screen
        name="index"
        options={{ title: t("wallet.home.custom-token.index.title") }}
      />
      <Stack.Screen
        name="add-custom-token"
        options={{
          title: t("wallet.home.custom-token.add-custom-token.title"),
        }}
      />
    </Stack>
  );
}
