import { Blockchain, GetNFTMetadataReply, GetNFTsByOwnerReply } from "@ankr.com/ankr.js"

import { nftType } from "@/@types/nft"
import { ApiEndpoints, ApiResponse, httpClient } from "@/config/axios"

export const getEvmNfts = async (address: string, page: number = 10, pageToken: string | undefined) => {
    try {
        // const nftReference = await ankrProvider.getNFTsByOwner({
        //     walletAddress: address,
        //     pageSize: page
        // })

        const response = await httpClient.post(ApiEndpoints.GET_NFT_BY_OWNER, {
            id: 1,
            wallet_address: address,
            blockchain: [],
            page_size: page,
            page_token: pageToken,

        }) as ApiResponse<GetNFTsByOwnerReply>

        if (!response.data.success) {
            throw new Error()
        }

        const nfts = response.data.ans.result


        const nft: nftType[] = nfts.assets.map(({ tokenId, blockchain, name, symbol, collectionName, contractAddress, imageUrl }) => {
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
    } catch (error) {
        console.log(error)
    }
}

export const getEvmNft = async (contractAddress: string, blockchain: Blockchain, tokenId: string) => {
    const response = await httpClient.post(ApiEndpoints.GET_NFT_METADATA, {
        id: 1,
        contract_address: contractAddress,
        blockchain,
        page_size: 1,
        token_id: tokenId

    }) as ApiResponse<GetNFTMetadataReply>

    if (!response.data.success) {
        throw new Error()
    }

    const nfts = response.data.ans.result


    return nfts.attributes
}