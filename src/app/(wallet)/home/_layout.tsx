import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";

import { useAssets } from "@/app/api/assets";
import { ApiEndpoints, httpClient } from "@/config/axios";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useStackOptions } from "@/hooks/useStackOptions";
import { AuthStorageTypes } from "@/providers/AuthProvider";

export default function _layout() {
  const stackOptions = useStackOptions();
  const { expoPushToken } = usePushNotifications();
  const { data: assetManager } = useAssets();
  useEffect(() => {
    const bootstrapAsync = async () => {
      const isPushTokenSaved = await AsyncStorage.getItem(
        AuthStorageTypes.is_AUTH_TOKEN_SAVED
      );

      if (isPushTokenSaved === "true") {
        return;
      }

      if (expoPushToken !== undefined) {
        try {
          const evmAddress = assetManager?.evmAddress;

          const response = await httpClient.post(ApiEndpoints.SAVE_PUSH_TOKEN, {
            wallet_address: evmAddress,
            push_token: expoPushToken.data,
          });

          AsyncStorage.setItem(AuthStorageTypes.is_AUTH_TOKEN_SAVED, "true");

          console.log(expoPushToken);
        } catch (e) {
          console.log(e, "error");
        }
      }
    };

    bootstrapAsync();
  }, [assetManager?.evmAddress, expoPushToken]);

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
