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
