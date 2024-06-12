import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

import { useAddAssets } from "@/app/api/assets";
import AuthLoading from "@/components/auth/AuthLoading";
import { useAuth } from "@/providers/AuthProvider";
import { createAssets } from "@/services/asset.service";

export default function WalletCreating() {
  const { mnemonic, setupPass } = useAuth();
  const { mutate: addAssets } = useAddAssets();

  useEffect(() => {
    setTimeout(async () => {
      try {
        const assets = await createAssets(
          mnemonic as string,
          setupPass as string
        );

        if (!assets) {
          return;
        }

        await AsyncStorage.setItem("assets", JSON.stringify(assets));

        router.push("auth/congretulation");
      } catch (error) {
        console.log(error);
        router.push("auth/auth-error");
      }
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthLoading label="Wallet is Creating" />;
}
