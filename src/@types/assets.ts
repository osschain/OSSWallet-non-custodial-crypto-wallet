
import { OSSblockchain } from "@/services/history.service";

export interface AccountType {
    address: string;
    publicKey: string;
    privateKey: string;
}

export type AssetType = {
    id: string;
    icon: string;
    name: string;
    account: AccountType;
    symbol: string;
    blockchain: OSSblockchain;
    contractAddress?: string;
    isShown: boolean;
    isNetwork: boolean;
};

export type tokenType = {
    symbol: string;
    name: string;
    decimals: string;
}





