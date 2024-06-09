
import { Blockchain } from "@ankr.com/ankr.js";
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
    "slip-0044": number;
};

export type tokenType = {
    symbol: string;
    name: string;
    decimals: string;
}




export type TokenpropertiesType =
    | (tokenType & { address: string; network: Blockchain })

