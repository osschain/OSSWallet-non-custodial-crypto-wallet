
import { OSSblockchain } from "./history.service";

import { ApiEndpoints, ApiResponse, httpClient } from "@/config/axios";
import { chainIds } from "@/config/blockchain";

type sendTransationType = { gasFee: number, privateKey: string, toAddress: string, blockchain: OSSblockchain, contractAddress?: string, amount: string }

export const sendTransaction = async ({ privateKey, toAddress, blockchain, contractAddress, amount, gasFee }: sendTransationType) => {
    if (blockchain === "btc" || blockchain === "solana") {
        throw new Error("Cant send")
    }

    // const endPoint = `https://rpc.ankr.com/${blockchain}/f7c0df84b43c7f9f2c529c76efc01da4b30271a66608da4728f9830ea17d29bc`

    const config = {
        private_key: privateKey,
        receiver_address: toAddress,
        amount,
        chain_id: chainIds[blockchain],
        blockchain,
        calculated_gas_fee: gasFee,
    }
    try {

        const isToken = !!contractAddress

        if (isToken) {
            const response = await httpClient.post(ApiEndpoints.CRYPTO_TOKEN_TRANSFER, {
                ...config,
                token_contract_address: contractAddress
            })

            console.log(response)
        } else {
            const response = await httpClient.post(ApiEndpoints.CRYPTO_CHAIN_TRANSFER, {
                ...config,
            })
            console.log(response)

        }
    } catch (error) {
        console.log(error,)
        throw error
    }

}



type gasPriceType = { fromAddress: string, toAddress: string, blockchain: OSSblockchain, contractAddress?: string, amount: string }

export const fetchGasFee = async ({ contractAddress, toAddress, fromAddress, amount, blockchain }: gasPriceType) => {
    try {
        const config = {
            sender_address: fromAddress,
            receiver_address: toAddress,
            amount,
            blockchain,
        }

        const isToken = !!contractAddress

        if (isToken) {
            const response = await httpClient.post(ApiEndpoints.CALCULATE_TOKEN_GAS_PRICE, {
                ...config,
                token_contract_address: contractAddress
            }) as ApiResponse<any>
            console.log(response.data)
        } else {
            const response = await httpClient.post(ApiEndpoints.CALCULATE_CHAIN_GAS_PRICE, {
                ...config,
            })
            console.log(response)
        }
    } catch (error) {
        console.log(error)
    }
}