import axios from "axios";

export enum ApiEndpoints {
  CALCULATE_CHAIN_GAS_PRICE = "/calculate_chain_gas_price",
  CALCULATE_TOKEN_GAS_PRICE = "/calculate_token_gas_price",
  CRYPTO_CHAIN_TRANSFER = "/crypto_chain_transfer",
  CRYPTO_TOKEN_TRANSFER = "/crypto_token_transfer",
  GET_NFT_METADATA = "/get_nft_metadata",
  GET_NFT_BY_OWNER = "/get_nft_by_owner",
  GET_TOKEN_TRANSFER = "/get_token_transfer",
  GET_CHAIN_TRANSFER = "/get_transaction_by_address",
  GET_ACCOUNT_BALANCE = "/get_account_balance",
}

const baseUrl = "https://hidden-slice-426318-j1.ey.r.appspot.com";
export const httpClient = axios.create({
  baseURL: baseUrl,
});

export interface ApiResponse<T> {
  data: {
    ans: {
      id: number;
      jsonrpc: string;
      result: T;
    };
    message: string;
    status: number;
    success: boolean;
  };
}
