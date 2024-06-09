import { Blockchain } from "@ankr.com/ankr.js"

export type nftType = {
    name: string,
    symbol: string,
    collectionName: string,
    image: string,
    contractAddress: string,
    blockchain: Blockchain,
    tokenId: string
}