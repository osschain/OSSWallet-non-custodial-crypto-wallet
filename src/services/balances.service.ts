import { AnkrProvider, Balance, GetAccountBalanceReply } from "@ankr.com/ankr.js";

import { AssetType } from "@/providers/AssetProvider";

const provider = new AnkrProvider(
    "https://rpc.ankr.com/multichain/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
);
const btcProvider = new AnkrProvider(
    "https://rpc.ankr.com/btc/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
);
type AssetNames = 'Ether' | "Bitcoin" | "Solana"

const getAddress = (assets: AssetType[], name: AssetNames) => {
    const address = assets.find((asset) => asset.name === name)?.account
        .address;

    return address as string
}

const getAdresses = (assets: AssetType[]) => {
    const evmAdress = getAddress(assets, 'Ether');
    const btcAddress = getAddress(assets, 'Bitcoin')
    const solanaAddres = getAddress(assets, "Solana")

    return [
        { address: evmAdress, name: 'evm' },
        { address: btcAddress, name: 'Bitcoin' },
        { address: solanaAddres, name: 'Solana' }
    ]
}

const fetchBalances = async (addresses: { address: string, name: string }[]) => {
    const result: Balance[] = [];

    for (const { address, name } of addresses) {
        if (name === "evm") {
            const balances = await provider.getAccountBalance({
                blockchain: ["eth", "polygon"],
                walletAddress: address,
            });
            result.push(...balances.assets);
        } else if (name === 'Bitcoin') {

        }
    }
    console.log(result)
    return result;
};

export const getBalances = async (assets: AssetType[]) => {


    // if (!evmAdress) return null;
    const addresses = getAdresses(assets)
    const balances = await fetchBalances(addresses)


    console.log(balances)
    const filteredBalane = balances.map(
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