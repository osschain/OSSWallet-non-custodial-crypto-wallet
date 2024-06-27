import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { AssetType } from "@/@types/assets";
import { AddresTypes } from "@/@types/balances";
import { useStore } from "@/providers/StoreProvider";
import { getEvmBalance } from "@/services/balances.service";

export const UseBalances = (asset: AssetType) => {
  const { blockchain, contractAddress, account, symbol } = asset;
  const address = account.address;

  const { data: assetsManager } = useAssets();
  const assets = assetsManager?.assets;
  const { updateTotalBalance } = useStore();

  return useQuery({
    queryKey: ["balances", blockchain, contractAddress],
    queryFn: async () => {
      if (!assets) {
        throw new Error("Asset is not presented");
      }

      const type = assetsManager.addresses.find(
        (item) => item.address === address
      )?.type;

      if (AddresTypes.evm === type) {
        const evmBalance = await getEvmBalance(
          address,
          blockchain,
          contractAddress as string,
          symbol
        );

        const { balance, price } = evmBalance;

        updateTotalBalance(Number(balance) * price);

        return balance && Number(balance) > 0 ? Number(balance).toFixed(4) : 0;
      }

      return 0;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useTotalBalance = () => {
  return useQuery({
    queryKey: ["totalBalance"],
    queryFn: async () => {
      const totalBalance = await AsyncStorage.getItem("totalBalance");

      return Number(totalBalance) || 0;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
