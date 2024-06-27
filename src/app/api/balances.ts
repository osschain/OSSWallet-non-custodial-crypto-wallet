import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { AddresTypes } from "@/@types/balances";
import { getEvmBalance } from "@/services/balances.service";
import { useStore } from "@/providers/StoreProvider";

const updateTotalBalance = async (amount: number) => {
  const currentBalance = Number(await AsyncStorage.getItem("totalBalance"));

  await AsyncStorage.setItem(
    "totalBalance",
    (currentBalance || 0 + amount).toString()
  );
};

export const UseBalances = (
  address: string,
  blockchain: string,
  contractAddress = ""
) => {
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
        const balance = await getEvmBalance(
          address,
          blockchain,
          contractAddress
        );

        updateTotalBalance(balance);

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
