import { Blockchain } from "@ankr.com/ankr.js";
import { formatEther } from "ethers";
import { v4 as uuidv4 } from 'uuid';

import { AddresTypes, AddressType } from "@/@types/balances";
import { HistoryType } from "@/@types/history";
import { ankrProvider } from "@/config/ankr";
import { unixTimestampToDate } from "@/util/unixToDate";


export const getHistories = async (addresses: AddressType[], page: number = 1, blockchains: Blockchain[]) => {
    const result: HistoryType[] = []
    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {
                const tokenHistory = await getChainHistories({ address, blockchain: blockchains, page })
                const chainHistory = await getTokenHistories({ address, blockchain: blockchains, page })


                const histories = [...tokenHistory, ...chainHistory]


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

type getChainHistoryParams = {
    address: string;
    blockchain?: Blockchain[] | OSSblockchain;
    page: number;
}


export const getChainHistories = async ({ address, blockchain, page }: getChainHistoryParams) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return []
    }

    try {


        const transactions = await ankrProvider.getTransactionsByAddress({
            blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
            address: [address],
            descOrder: true,
            pageSize: page
        });


        const histories = transactions.transactions.map(({ timestamp, gasPrice, gasUsed, nonce, to, from, value, blockchain }) => {
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
                nonce,
                fee: Number(gasPrice) * Number(gasUsed),
                date: timestamp ? unixTimestampToDate(timestamp) : null
            }
        }).filter(Boolean) as HistoryType[]

        return histories
    } catch (error) {
        throw error
    }
}

export const getTokenHistories = async ({ address, blockchain, page }: getChainHistoryParams) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return []
    }
    console.log(blockchain)

    try {
        const transactions = await ankrProvider.getTokenTransfers({
            blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
            address: [address],
            descOrder: true,
            pageSize: page

        });



        const histories = transactions.transfers.map(({ timestamp, blockchain, toAddress, fromAddress, value, contractAddress }) => {

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
                blockchain: blockchain as OSSblockchain,
                date: timestamp ? unixTimestampToDate(timestamp) : null
            }
        }) as HistoryType[]

        console.log(histories)

        return histories
    } catch (error) {
        throw error
    }
}