import { Blockchain } from "@ankr.com/ankr.js";
import { formatEther } from "ethers";
import { v4 as uuidv4 } from 'uuid';

import { HistoryType } from "@/@types/history";
import { ankrProvider } from "@/config/ankr";
import History from "@/models/history.model";
import { unixTimestampToDate } from "@/util/unixToDate";


export const getEvmHistory = async (address: string, page: number = 1, blockchain: Blockchain[]) => {
    try {
        const tokenHistory = await getEvmChainHistories({ address, blockchain, page })
        const chainHistory = await getEvmTokenHistories({ address, blockchain, page })

        const nextPageToken = tokenHistory.nextPageToken ? tokenHistory.nextPageToken : chainHistory.nextPageToken

        const histories = [...tokenHistory.histories, ...chainHistory.histories]



        return new History(histories, nextPageToken)

    } catch (error) {
        console.error("Error fetching histories:", error);
        throw error
    }
}

export type OSSblockchain = Blockchain | "solana" | 'btc';

type EvmHistoriesParams = {
    address: string;
    blockchain: Blockchain[] | Blockchain;
    page: number;
}


export const getEvmChainHistories = async ({ address, blockchain, page }: EvmHistoriesParams) => {
    try {


        const transactions = await ankrProvider.getTransactionsByAddress({
            blockchain: (Array.isArray(blockchain) ? blockchain : [blockchain]),
            address: [address],
            descOrder: true,
            pageSize: page
        });


        const histories = transactions.transactions.map(({ timestamp, gasPrice, gasUsed, nonce, to, from, value, blockchain }) => {
            if (!blockchain || !to) {
                return;
            }
            return {
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
        return new History(histories, transactions.nextPageToken)
    } catch (error) {
        throw error
    }
}

export const getEvmTokenHistories = async ({ address, blockchain, page }: EvmHistoriesParams) => {
    try {
        const transactions = await ankrProvider.getTokenTransfers({
            blockchain: (Array.isArray(blockchain) ? blockchain : [blockchain]),
            address: [address],
            descOrder: true,
            pageSize: page

        });



        const histories = transactions.transfers.map(({ timestamp, blockchain, toAddress, fromAddress, value, contractAddress }) => {

            if (!contractAddress || !toAddress || !fromAddress) {
                return;
            }

            return {
                to: toAddress,
                from: fromAddress,
                id: contractAddress,
                key: uuidv4(),
                value,
                blockchain: blockchain as OSSblockchain,
                date: timestamp ? unixTimestampToDate(timestamp) : null
            }
        }).filter(Boolean) as HistoryType[]


        return new History(histories, transactions.nextPageToken)
    } catch (error) {
        throw error
    }
}