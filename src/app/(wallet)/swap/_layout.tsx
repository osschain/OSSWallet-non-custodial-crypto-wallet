import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useStackOptions } from "@/hooks/useStackOptions";

export default function _layout() {
  const { t } = useTranslation();
  const stackOptions = useStackOptions();

  return (
    <Stack screenOptions={stackOptions}>
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
