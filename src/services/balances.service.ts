import { AnkrProvider } from "@ankr.com/ankr.js";

import { AssetType } from "@/providers/AssetProvider";

const provider = new AnkrProvider(
    "https://rpc.ankr.com/multichain/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
);

export const getBalances = async (assets: AssetType[]) => {
    const evmAdress = assets?.find((asset) => asset.name === "Ether")?.account
        .address;
    if (!evmAdress) return null;

    const balances = await provider.getAccountBalance({
        blockchain: ["eth", "polygon"],
        walletAddress: evmAdress,
    });
    const filteredBalane = balances.assets.map(
        ({ balance, balanceUsd, tokenName }) => {
            return {
                balance,
                balanceUsd,
                name: tokenName,
            };
        }
    );

    return filteredBalane;
};