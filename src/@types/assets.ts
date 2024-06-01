
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
};





