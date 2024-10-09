import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { getBalances } from "@/services/balances.service";
import Balance from "@/models/balance.model";

// export const UseBalances = (asset: AssetType) => {
//   const { blockchain, contractAddress, account, symbol, id } = asset;
//   const address = account.address;

//   const { data: assetsManager } = useAssets();

//   const assets = assetsManager?.assets;

//   return useQuery({
//     queryKey: ["balances", id.toLocaleLowerCase()],
//     queryFn: async () => {
//       if (!assets) {
//         throw new Error("Asset is not presented");
//       }

//       const type = assetsManager.addresses.find(
//         (item) => item.address === address
//       )?.type;

//       if (AddresTypes.evm === type) {
//         const evmBalance = await getEvmBalance(
//           address,
//           blockchain,
//           contractAddress as string,
//           symbol
//         );
//         const { balance, price } = evmBalance;

//         return {
//           balance:
//             balance && Number(balance) > 0 ? Number(balance).toFixed(4) : 0,
//           price,
//         };
//       }

//       return { balance: 0, price: 0 };
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//   });
// };

export const UseBalances = () => {
  const { data: assetsManager } = useAssets();
  const assets = assetsManager?.assets;

  return useQuery({
    queryKey: ["balances"],
    queryFn: async () => {
      if (!assets) {
        throw new Error("Asset is not presented");
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
    select: (data) => {
      return new Balance(data);
    },
  });
};
