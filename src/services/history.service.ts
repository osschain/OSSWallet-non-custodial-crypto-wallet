import { Blockchain } from "@ankr.com/ankr.js";
import { formatEther } from "ethers";
import { v4 as uuidv4 } from 'uuid';

import { AddresTypes, AddressType } from "@/@types/balances";
import { HistoryType } from "@/@types/history";
import { ankrProvider } from "@/config/ankr";


export const getHistories = async (addresses: AddressType[], page: number = 1) => {
    const result: HistoryType[] = []
    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {

                const [chainHistories, tokenHistories] = await Promise.all([
                    ankrProvider.getTransactionsByAddress({
                        blockchain: [],
                        address: [address],
                        pageSize: page,
                        descOrder: true,

                    }),
                    ankrProvider.getTokenTransfers({
                        blockchain: [],
                        address: [address],
                        pageSize: page,

                        descOrder: true,
                    })
                ]);

                const tranformchainHistories = chainHistories.transactions.map(({ value, to, from, blockchain }) => {
                    if (!blockchain || !to) {
                        return;
                    }
                    return {
                        nextPageToken: chainHistories.nextPageToken,
                        to,
                        from,
                        id: blockchain,
                        key: uuidv4(),
                        value: formatEther(value),
                        blockchain: blockchain as OSSblockchain,
                    }
                }) as HistoryType[]


                const tranformTokenHistories = tokenHistories.transfers.map(({ blockchain, value, toAddress, fromAddress, contractAddress }) => {
                    if (!contractAddress || !toAddress || !fromAddress) {
                        return;
                    }
                    return {
                        nextPageToken: tokenHistories.nextPageToken,
                        to: toAddress,
                        from: fromAddress,
                        id: contractAddress,
                        key: uuidv4(),
                        value,
                        blockchain: blockchain as OSSblockchain
                    }
                }) as HistoryType[]


                const histories = [...tranformchainHistories, ...tranformTokenHistories]


                result.push(...histories)

            }
        }
        return result

    } catch (error) {
        console.error("Error fetching histories:", error);
        throw error
    }
}

export type OSSblockchain = Blockchain | "solana" | 'btc';

export const getChainHistory = async (address: string, blockchain: OSSblockchain, page: number) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return []
    }

    try {


        const transactions = await ankrProvider.getTransactionsByAddress({
            blockchain: [blockchain],
            address: [address],
            descOrder: true,
            pageSize: page
        });


        const histories = transactions.transactions.map(({ to, from, value, blockchain }) => {
            if (!blockchain || !to) {
                return;
            }
            return {
                nextPageToken: transactions.nextPageToken,
                to,
                from,
                id: blockchain,
                key: uuidv4(),
                value: formatEther(value),
                blockchain: blockchain as OSSblockchain,
            }
        }).filter(Boolean) as HistoryType[]

        return histories
    } catch (error) {
        throw error
    }
}

export const getTokenHistory = async (address: string, blockchain: OSSblockchain, page: number) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return []
    }


    try {
        const transactions = await ankrProvider.getTokenTransfers({
            blockchain: [blockchain],
            address: [address],
            descOrder: true,
            pageSize: page

        });


        const histories = transactions.transfers.map(({ blockchain, toAddress, fromAddress, value, contractAddress }) => {

            if (!contractAddress || !toAddress || !fromAddress) {
                return;
            }

            return {
                nextPageToken: transactions.nextPageToken,
                to: toAddress,
                from: fromAddress,
                id: contractAddress,
                key: uuidv4(),
                value,
                blockchain: blockchain as OSSblockchain
            }
        }) as HistoryType[]

        return histories
    } catch (error) {
        throw error
    }
}