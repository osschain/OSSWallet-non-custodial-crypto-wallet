import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { getBalances, getEvmBalance } from "@/services/balances.service";
import { AddresTypes } from "@/@types/balances";

export const UseBalances = (
  address: string,
  blockchain: string,
  contractAddress = ""
) => {
  const { data: assetsManager } = useAssets();
  const assets = assetsManager?.assets;

  return useQuery({
    queryKey: ["balances", blockchain, contractAddress],
    queryFn: async () => {
      console.log(address);
      if (!assets) {
        throw new Error("Asset is not presented");
      }

      const type = assetsManager.addresses.find(
        (item) => item.address === address
      )?.type;

      if (AddresTypes.evm === type) {
        const balance = await getEvmBalance(address, blockchain);
        console.log(balance);
      }
      const balances = await getBalances(assetsManager.addresses);

      const shownIds = assetsManager.shownIds;

      const uniqueIds = new Set();

      const filteredBalances = balances.filter((balance) => {
        if (shownIds.includes(balance.id) && !uniqueIds.has(balance.id)) {
          uniqueIds.add(balance.id);
          return true;
        }
        return false;
      });

      return filteredBalances;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
  });
};
