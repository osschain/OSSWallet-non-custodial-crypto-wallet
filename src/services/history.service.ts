import { Blockchain, GetTokenTransfersReply, GetTransactionsByAddressReply } from "@ankr.com/ankr.js";
import { formatEther } from "ethers";
import { v4 as uuidv4 } from 'uuid';

import { HistoryType } from "@/@types/history";
import { ApiEndpoints, ApiResponse, httpClient } from "@/config/axios";
import History from "@/models/history.model";
import { unixTimestampToDate } from "@/util/unixToDate";


export const getEvmHistory = async (address: string, page: number = 1, blockchain: Blockchain[], pageToken: string | undefined) => {
    try {
        const tokenHistory = await getEvmChainHistories({ address, blockchain, page, pageToken })
        const chainHistory = await getEvmTokenHistories({ address, blockchain, page, pageToken })

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
    pageToken: undefined | string,
}


export const getEvmChainHistories = async ({ address, blockchain, page, pageToken }: EvmHistoriesParams) => {
    try {


        const response = await httpClient.post(ApiEndpoints.GET_CHAIN_TRANSFER, {
            id: 1,
            wallet_address: address,
            blockchain: (Array.isArray(blockchain) ? blockchain : [blockchain]),
            page_size: page,
            page_token: pageToken
        }) as ApiResponse<GetTransactionsByAddressReply>

        if (!response.data.success) {
            throw new Error()
        }

        const transactions = response.data.ans.result

        const histories = transactions.transactions.map(({ hash, timestamp, gasPrice, gasUsed, nonce, to, from, value, blockchain }) => {
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
                date: timestamp ? unixTimestampToDate(timestamp) : null,
                hash
            }
        }).filter(Boolean) as HistoryType[]

        return new History(histories, transactions.nextPageToken)
    } catch (error) {
        throw error
    }
}

export const getEvmTokenHistories = async ({ address, blockchain, page, pageToken }: EvmHistoriesParams) => {
    try {

        const response = await httpClient.post(ApiEndpoints.GET_TOKEN_TRANSFER, {
            id: 1,
            wallet_address: address,
            blockchain: (Array.isArray(blockchain) ? blockchain : [blockchain]),
            page_size: page,
            page_token: pageToken
        }) as ApiResponse<GetTokenTransfersReply>

        if (!response.data.success) {
            throw new Error()
        }

        const transactions = response.data.ans.result

        const histories = transactions.transfers.map(({ transactionHash, timestamp, blockchain, toAddress, fromAddress, value, contractAddress }) => {

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
                date: timestamp ? unixTimestampToDate(timestamp) : null,
                hash: transactionHash
            }
        }).filter(Boolean) as HistoryType[]


        return new History(histories, transactions.nextPageToken)
    } catch (error) {
        console.log(error)
        throw error
    }
}