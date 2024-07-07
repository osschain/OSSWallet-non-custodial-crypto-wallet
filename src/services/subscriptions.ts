import { ApiEndpoints, httpClient } from "@/config/axios"

export const subscribe = async ({ blockchain, address }: { blockchain: string, address: string }) => {
    try {
        await httpClient.post(
            ApiEndpoints.SUBSCRIBE_TO_WALLET,
            {
                wallet_address: address,
                blockchain
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export const getLastTransactions = async ({ address }: { address: string }) => {
    try {
        const response = await httpClient.post(
            ApiEndpoints.GET_LAST_TRANSACTIONS,
            { wallet_address: address }

        )

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}