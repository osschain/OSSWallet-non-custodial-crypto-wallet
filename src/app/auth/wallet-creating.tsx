import { router } from "expo-router";
import { useEffect } from "react";

import { useAddAssets } from "@/app/api/assets";
import AuthLoading from "@/components/auth/AuthLoading";
import { useAuth } from "@/providers/AuthProvider";
import { createAssets } from "@/services/asset.service";

export default function WalletCreating() {
  const { mnemonic } = useAuth();
  const { mutate: addAssets } = useAddAssets();

  useEffect(() => {
    setTimeout(async () => {
      const assets = await createAssets(mnemonic as string);

      if (!assets) {
        return;
      }
      addAssets(assets);

      router.push("auth/congretulation");
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthLoading label="Wallet is Creating" />;
}
