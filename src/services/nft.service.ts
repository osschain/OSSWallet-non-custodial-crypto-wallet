import { Blockchain } from "@ankr.com/ankr.js"

import { nftType } from "@/@types/nft"
import { ankrProvider } from "@/config/ankr"

export const getEvmNfts = async (address: string, page: number = 10) => {
    const nftReference = await ankrProvider.getNFTsByOwner({
        walletAddress: address,
        pageSize: page
    })

    const nft: nftType[] = nftReference.assets.map(({ tokenId, blockchain, name, symbol, collectionName, contractAddress, imageUrl }) => {
        return {
            name,
            symbol,
            collectionName,
            contractAddress,
            image: imageUrl,
            blockchain,
            tokenId
        }
    })

    return nft
}

export const getEvmNft = async (contractAddress: string, blockchain: Blockchain, tokenId: string) => {
    const nftReference = await ankrProvider.getNFTMetadata({
        contractAddress,
        blockchain,
        tokenId,
        forceFetch: false
    })

    console.log(tokenId)

    return nftReference.attributes
}