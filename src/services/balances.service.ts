
import { ankrProvider } from "@/config/ankr";
import { solanaEndpoint } from "@/config/endpoints";
import { AssetType } from "@/providers/AssetProvider";



type AssetNames = 'Ether' | "Bitcoin" | "Solana"
export type addressType = { address: string, name: AssetNames }
export const getAddress = (assets: AssetType[], name: AssetNames) => {
    const address = assets.find((asset) => asset.name === name)?.account
        .address;

    return address as string
}

export const getAdresses = (assets: AssetType[]) => {
    const evmAdress = getAddress(assets, 'Ether');
    const btcAddress = getAddress(assets, 'Bitcoin')
    const solanaAddres = getAddress(assets, "Solana")

    const addresses: addressType[] = [
        { address: evmAdress, name: 'Ether' },
        { address: btcAddress, name: 'Bitcoin' },
        { address: solanaAddres, name: 'Solana' }
    ]

    return addresses
}

export const solanaGetBalance = async (address: string) => {
    try {
        const data = {
            jsonrpc: "2.0",
            method: "getBalance",
            params: [address],
            id: 1
        };

        const response = await fetch(solanaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const balance = await response.json()

        return balance.result.value
    } catch (error) {
        throw error
    }
}



export const fetchBalances = async (addresses: { address: string, name: AssetNames }[]) => {
    const result: { tokenName: string, balance: string, balanceUsd: string }[] = [];

    try {
        for (const { address, name } of addresses) {
            if (name === "Ether") {
                const balances = await ankrProvider.getAccountBalance({
                    blockchain: [],
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
    } catch (error) {
        throw error
    }
};

export const getBalances = async (assets: AssetType[]) => {


    try {
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
    } catch (error) {
        throw error
    }
};