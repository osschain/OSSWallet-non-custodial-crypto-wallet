import { router } from "expo-router";
import { useEffect } from "react";

import AuthLoading from "@/components/auth/AuthLoading";
import { useAuth } from "@/providers/AuthProvider";
import { useWallet } from "@/providers/WalletProvider";
import { createWallets } from "@/util/ethers";

export default function WalletCreating() {
  const { addWallets } = useWallet();
  const { seed, setupPass } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      const wallets = createWallets(seed as string);

      if (!wallets) {
        return;
      }
      addWallets(wallets);
      router.push("auth/congretulation");
    }, 0);
  }, []);

  return <AuthLoading label="Wallet Creating" />;
}
