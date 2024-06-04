import { AssetType } from "@/@types/assets";
import { AddresTypes, BalancesType, AddressType } from "@/@types/balances";
import { ankrProvider } from "@/config/ankr";
import { solanaEndpoint } from "@/config/endpoints";


export const totalBalance = (balances: BalancesType[] | undefined) => {
    const balance = balances?.reduce((prev, current) => {
        return Number(current.balanceUsd) + prev;
    }, 0);

    if (balance === 0) return balance;
    return Number(balance?.toFixed(2));
};

export const calculateBalance = (id: string, balances: BalancesType[] | undefined) => {
    const balance = Number(
        balances?.find((balance) => {
            return id.toLowerCase() === balance.id.toLowerCase()
        })
            ?.balance || 0
    );

    return balance;
};

export const calculateUsdBalance = (id: string, balances: BalancesType[] | undefined) => {
    const balance = Number(
        balances?.find((balance) => id.toLowerCase() === balance.id.toLowerCase())
            ?.balanceUsd || 0
    );

    return Number(balance.toFixed(2));
};


export const getAddress = (assets: AssetType[], type: AddresTypes) => {
    try {
        const address = assets.find((asset) => asset.blockchain === type)?.account
            .address;

        return address as string
    } catch {
        throw new Error("Can't find adress");
    }
}

export const getAdresses = (assets: AssetType[] | undefined) => {

    if (!assets) {
        throw new Error("Asset is not presented");
    }

    const evmAdress = getAddress(assets, AddresTypes.evm);
    const btcAddress = getAddress(assets, AddresTypes.btc)
    const solanaAddres = getAddress(assets, AddresTypes.solana)


    const addresses: AddressType[] = [
        { address: evmAdress, type: AddresTypes.evm },
        { address: btcAddress, type: AddresTypes.btc },
        { address: solanaAddres, type: AddresTypes.solana }
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

export const getCustomTokens = (assets: AssetType[]) => {
    const customTokens = assets.filter(asset => asset.contractAddress)

    return customTokens
}



export const getChainBalances = async (addresses: { address: string, type: AddresTypes }[]) => {
    const result: BalancesType[] = [];

    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {
                const balances = await ankrProvider.getAccountBalance({
                    blockchain: [],
                    walletAddress: address,
                });
                result.push(...balances.assets.map((balance) => {
                    return {
                        ...balance,
                        id: balance.contractAddress ? balance.contractAddress : balance.blockchain
                    }
                }));

            } else if (type === AddresTypes.solana) {
                const balance = await solanaGetBalance(address)
                result.push({
                    balance,
                    balanceUsd: "0",
                    id: type
                })
            } else if (type === AddresTypes.btc) {

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
        const chainBalances = await getChainBalances(addresses)

        // const customTokens = getCustomTokens(assets);
        // const tokenBalances = await getTokenBalances(customTokens)

        // console.log(tokenBalances)

        // const balances = [...chainBalances, ...tokenBalances]

        const filteredBalane = chainBalances.map(
            ({ balance, balanceUsd, id }) => {
                return {
                    balance,
                    balanceUsd,
                    id,
                };
            }
        );


        return filteredBalane;
    } catch (error) {
        console.log(error)
        throw error
    }
};