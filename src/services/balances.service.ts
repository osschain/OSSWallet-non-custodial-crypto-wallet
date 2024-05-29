import { AnkrProvider, Balance, GetAccountBalanceReply } from "@ankr.com/ankr.js";

import { AssetType } from "@/providers/AssetProvider";

const provider = new AnkrProvider(
    "https://rpc.ankr.com/multichain/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
);

const btcEndpoint = "https://rpc.ankr.com/btc/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
const solanaEnndpoint = "https://rpc.ankr.com/solana/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"

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

    const addresses: { address: string, name: AssetNames }[] = [
        { address: evmAdress, name: 'Ether' },
        { address: btcAddress, name: 'Bitcoin' },
        { address: solanaAddres, name: 'Solana' }
    ]

    return addresses
}

const solanaGetBalance = async (address: string) => {
    const data = {
        jsonrpc: "2.0",
        method: "getBalance",
        params: [address],
        id: 1
    };

    const response = await fetch(solanaEnndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const balance = await response.json()

    return balance.result.value
}



const fetchBalances = async (addresses: { address: string, name: AssetNames }[]) => {
    const result: { tokenName: string, balance: string, balanceUsd: string }[] = [];

    for (const { address, name } of addresses) {
        if (name === "Ether") {
            const balances = await provider.getAccountBalance({
                blockchain: ["eth", "polygon"],
                walletAddress: address,
            });
            result.push(...balances.assets);
        } else if (name === 'Solana') {
            const balance = await solanaGetBalance(address)
            result.push({
                balance,
                balanceUsd: "0",
                tokenName: name
            })
        } else if (name === "Bitcoin") {

        }
    }
    return result;
};

export const getBalances = async (assets: AssetType[]) => {


    // if (!evmAdress) return null;
    const addresses = getAdresses(assets)
    const balances = await fetchBalances(addresses)


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