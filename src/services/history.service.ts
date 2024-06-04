import { Blockchain } from "@ankr.com/ankr.js";


import { AddresTypes, AddressType } from "@/@types/balances";
import { HistoryType } from "@/@types/history";
import { ankrProvider } from "@/config/ankr";
import { hexDecoder } from "@/util/hexDecoder";


export const getHistories = async (addresses: AddressType[]) => {
    const result: HistoryType[] = []
    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {
                const histories = await ankrProvider.getTransactionsByAddress({
                    blockchain: [],
                    address: [address],
                    descOrder: true,
                });

                const filtered = histories.transactions.map(({ to, from, value, blockchain }) => {
                    return {
                        to,
                        from,
                        value: hexDecoder(value).toString(),
                        id: blockchain,
                        blockchain: blockchain as OSSblockchain
                    }
                })

                result.push(...filtered)

            }
        }
        return result

    } catch (error) {
        throw error
    }
}

export type OSSblockchain = Blockchain | "solana" | 'btc';

export const getHistory = async (address: string, blockchain: OSSblockchain) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return null
    }

    try {


        const histories = await ankrProvider.getTransactionsByAddress({
            blockchain: [blockchain],
            address: [address],
            descOrder: true,
        });


        const filtered = histories.transactions.map(({ to, from, value, blockchain, contractAddress }) => {
            return {
                to,
                from,
                value: hexDecoder(value).toString(),
                id: contractAddress ? contractAddress : blockchain
            }
        })

        return filtered
    } catch (error) {
        throw error
    }
}