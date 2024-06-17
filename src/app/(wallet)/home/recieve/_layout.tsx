import IosHeaderLeft from "@/components/layout/IosHeaderLeft";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

export default function _layout() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerLeft: () => (Platform.OS === "ios" ? <IosHeaderLeft /> : null),
        headerStyle: { backgroundColor: theme.colors["bg-primary"] },
        headerTintColor: theme.colors["text-primary"],

        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: t("wallet.home.recieve.recieve-details.title") }}
      />
    </Stack>
  );
}
