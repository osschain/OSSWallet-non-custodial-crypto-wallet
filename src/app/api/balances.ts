import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { AddresTypes } from "@/@types/balances";
import { getEvmBalance } from "@/services/balances.service";

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
        const balance = await getEvmBalance(
          address,
          blockchain,
          contractAddress
        );
        console.log(balance, "THIS IS BLAANACE");

        return balance && Number(balance) > 0 ? Number(balance).toFixed(4) : 0;
      }

      return 0;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
