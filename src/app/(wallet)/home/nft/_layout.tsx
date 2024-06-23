import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useStackOptions } from "@/hooks/useStackOptions";

export default function _layout() {
  const { t } = useTranslation();
  const stackOptions = useStackOptions();
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="[nftSlug]" options={{ title: t("shared.NFT") }} />
      <Stack.Screen name="transfer" options={{ headerShown: false }} />
    </Stack>
  );
}
