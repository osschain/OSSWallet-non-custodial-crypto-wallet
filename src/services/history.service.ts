import { Blockchain } from "@ankr.com/ankr.js";
import { formatEther } from "ethers";

import { AddresTypes, AddressType } from "@/@types/balances";
import { HistoryType } from "@/@types/history";
import { ankrProvider } from "@/config/ankr";


export const getHistories = async (addresses: AddressType[]) => {
    const result: HistoryType[] = []
    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {
                const chainHistories = await ankrProvider.getTransactionsByAddress({
                    blockchain: [],
                    address: [address],
                    descOrder: true,
                });

                const tokenHistories = await ankrProvider.getTokenTransfers({
                    blockchain: [],
                    address: [address],
                    descOrder: true,
                });

                const tranformchainHistories = chainHistories.transactions.map(({ value, hash, to, from, blockchain }) => {
                    if (!hash || !blockchain || !to) {
                        return;
                    }
                    return {
                        to,
                        from,
                        id: blockchain,
                        hash,
                        value: formatEther(value),
                        blockchain: blockchain as OSSblockchain,
                    }
                }) as HistoryType[]


                const tranformTokenHistories = tokenHistories.transfers.map(({ blockchain, value, transactionHash, toAddress, fromAddress, contractAddress }) => {
                    if (!transactionHash || !contractAddress || !toAddress || !fromAddress) {
                        return;
                    }
                    return {
                        to: toAddress,
                        from: fromAddress,
                        id: contractAddress,
                        hash: transactionHash,
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
        throw error
    }
}

export type OSSblockchain = Blockchain | "solana" | 'btc';

export const getChainHistory = async (address: string, blockchain: OSSblockchain) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return null
    }

    try {


        const transactions = await ankrProvider.getTransactionsByAddress({
            blockchain: [blockchain],
            address: [address],
            descOrder: true,
        });


        const histories = transactions.transactions.map(({ hash, to, from, value, blockchain }) => {
            if (!hash || !blockchain || !to) {
                return;
            }
            return {
                to,
                from,
                id: blockchain,
                hash,
                value: formatEther(value),
                blockchain: blockchain as OSSblockchain,
            }
        }).filter(Boolean) as HistoryType[]

        return histories
    } catch (error) {
        throw error
    }
}

export const getTokenHistory = async (address: string, blockchain: OSSblockchain) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return null
    }

    try {


        const transactions = await ankrProvider.getTokenTransfers({
            blockchain: [blockchain],
            address: [address],
            descOrder: true,
        });

        const histories = transactions.transfers.map(({ blockchain, transactionHash, toAddress, fromAddress, value, contractAddress }) => {

            if (!transactionHash || !contractAddress || !toAddress || !fromAddress) {
                return;
            }

            return {
                to: toAddress,
                from: fromAddress,
                id: contractAddress,
                hash: transactionHash,
                value,
                blockchain: blockchain as OSSblockchain
            }
        }) as HistoryType[]

        return histories
    } catch (error) {
        throw error
    }
}