import { router } from "expo-router";
import { useEffect } from "react";

import AuthLoading from "@/components/auth/AuthLoading";
import { useAsset } from "@/providers/AssetProvider";
import { useAuth } from "@/providers/AuthProvider";
import { createAssets } from "@/util/ethers";

export default function WalletCreating() {
  const { addAssets } = useAsset();
  const { mnemonic } = useAuth();

  useEffect(() => {
    setTimeout(async () => {
      const wallets = await createAssets(mnemonic as string);

      if (!wallets) {
        return;
      }
      addAssets(wallets);
      router.push("auth/congretulation");
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthLoading label="Wallet is Creating" />;
}
