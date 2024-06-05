import { OSSblockchain } from "@/services/history.service";

export type HistoryType = {
    nextPageToken: string;
    blockchain: OSSblockchain,
    from: string | undefined;
    to: string | undefined;
    value: string;
    id: string;
    key: string;
};