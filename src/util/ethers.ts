import { HDNodeWallet } from "ethers";

import chains from "@/data/chains.json";
export const createWallets = (seed: string) => {
  try {
    const evmWallet = HDNodeWallet.fromPhrase(
      seed as string,
      `m/44'/60'/0'/0/0`
    );

    const wallets = chains.map((chain) => {
      const path = `m/44'/${chain["slip-0044"]}'/0'/0/0`;

      return {
        id: chain.id,
        wallet:
          chain["slip-0044"] === 60
            ? evmWallet
            : HDNodeWallet.fromPhrase(seed as string, path),
      };
    });

    return wallets;
  } catch (error) {
    console.log(error);
  }
};
