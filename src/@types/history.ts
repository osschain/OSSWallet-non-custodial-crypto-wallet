import { OSSblockchain } from "@/services/history.service";

export type HistoryType = {
    nextPageToken: string;
    blockchain: OSSblockchain,
    from: string | undefined;
    to: string | undefined;
    date: string;
    nonce: string;
    value: string;
    id: string;
    key: string;
    fee: number;
};