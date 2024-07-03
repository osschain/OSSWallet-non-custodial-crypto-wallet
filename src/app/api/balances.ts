import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { AssetType } from "@/@types/assets";
import { AddresTypes } from "@/@types/balances";
import { getEvmBalance } from "@/services/balances.service";

export const UseBalances = (asset: AssetType) => {
  const { blockchain, contractAddress, account, symbol } = asset;
  const address = account.address;

  const { data: assetsManager } = useAssets();

  const assets = assetsManager?.assets;

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
        const { balance, price } = evmBalance



        return { balance: balance && Number(balance) > 0 ? Number(balance).toFixed(4) : 0, price };
      }

      return { balance: 0, price: 0 };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,

  });
};

