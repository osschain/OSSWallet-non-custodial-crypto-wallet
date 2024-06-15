
import { OSSblockchain } from "./history.service";

import { ApiEndpoints, httpClient } from "@/config/axios";
import { chainIds } from "@/config/blockchain";

type sendTransationType = { gasFee: number, privateKey: string, toAddress: string, fromAddress: string, blockchain: OSSblockchain, contractAddress?: string, amount: number }

export const sendTransaction = async ({ privateKey, toAddress, blockchain, fromAddress, contractAddress, amount, gasFee }: sendTransationType) => {
    if (blockchain === "btc" || blockchain === "solana") {
        throw new Error("Cant send")
    }


    const config = {
        private_key: privateKey,
        sender_address: fromAddress,
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
        } else {
            const response = await httpClient.post(ApiEndpoints.CRYPTO_CHAIN_TRANSFER, {
                ...config,
            })
            console.log(response)
        }
    } catch (error) {
        console.log(error, 'error')
        throw error
    }

}



type gasPriceType = { fromAddress: string, toAddress: string, blockchain: OSSblockchain, contractAddress?: string, amount: number }
type GasFeeType = {
    gas_fee_native: number; // Represents the gas fee in native currency units
    gas_fee_wei: number; // Represents the gas fee in wei
    native_currency: string; // The name of the native currency (e.g., "MATIC")
    success: boolean; // Indicates if the operation was successful
};
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
            })

            return response.data as GasFeeType
        } else {
            const response = await httpClient.post(ApiEndpoints.CALCULATE_CHAIN_GAS_PRICE, {
                ...config,
            })

            return response.data as GasFeeType
        }
    } catch (error) {
        console.log(error)
    }
}