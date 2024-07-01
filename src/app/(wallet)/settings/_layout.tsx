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
        options={{
          title: t("wallet.settings.index.title"),
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="change-pass-code" options={{ title: "" }} />
      <Stack.Screen
        name="check-mnemonic"
        options={{
          title: t("wallet.settings.check-mnemonic.title"),
        }}
      />
    </Stack>
  );
}
