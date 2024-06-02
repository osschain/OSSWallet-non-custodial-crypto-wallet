
import { OSSblockchain } from "@/services/history.service";

export interface AccountType {
    address: string;
    publicKey: string;
    privateKey: string;
}

export type AssetType = {
    icon: string;
    name: string;
    account: AccountType;
    symbol: string;
    blockchain: OSSblockchain;
    network: string;
    type: "blockhain" | "token";
    isShown: boolean;
};

export type tokenType = {
    symbol: string;
    name: string;
    decimals: string;
}





