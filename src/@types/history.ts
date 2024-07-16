import { OSSblockchain } from "@/services/history.service";

type Type = "NFT" | "TOKEN"

export type HistoryType = {
    blockchain: OSSblockchain,
    from: string | undefined;
    to: string | undefined;
    date: string | undefined;
    nonce?: string;
    value: string;
    id: string;
    key: string;
    fee?: number;
    hash?: string;
    type: Type;
    timeStamp: number;
};