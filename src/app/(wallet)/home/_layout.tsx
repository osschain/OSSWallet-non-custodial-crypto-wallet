import { Stack } from "expo-router";
import { useEffect } from "react";

import { useAssets } from "@/app/api/assets";
import { blockhainToTatumChains } from "@/config/blockchain";
import { useStackOptions } from "@/hooks/useStackOptions";
import { subscribe } from "@/services/subscriptions";

export default function _layout() {
  const stackOptions = useStackOptions();
  const { data: assetManager } = useAssets();
  const shownAsset = assetManager?.shownBlockhains;

  useEffect(() => {
    if (shownAsset) {
      for (const asset of shownAsset) {
        subscribe({
          blockchain: blockhainToTatumChains[asset.blockchain],
          address: asset.account.address,
        });
      }
    }
  }, [shownAsset]);
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="recieve" options={{ headerShown: false }} />
      <Stack.Screen name="send" options={{ headerShown: false }} />
      <Stack.Screen name="asset" options={{ headerShown: false }} />
      <Stack.Screen name="nft" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />
      <Stack.Screen name="custom-token" options={{ headerShown: false }} />
    </Stack>
  );
}
