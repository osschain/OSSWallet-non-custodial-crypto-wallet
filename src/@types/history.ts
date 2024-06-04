import { OSSblockchain } from "@/services/history.service";

export type HistoryType = {
    blockchain: OSSblockchain,
    from: string | undefined;
    to: string | undefined;
    value: string;
    id: string;
    hash: string;
};