import { OSSblockchain } from "@/services/history.service";

export type HistoryType = {
    from: string;
    to: string | undefined;
    value: string;
    id: string | undefined;
    blockchain: OSSblockchain;
    transactionIndex: string;
};