import {
  Blockchain,
  GetNFTMetadataReply,
  GetNFTsByOwnerReply,
} from "@ankr.com/ankr.js";

import { nftType } from "@/@types/nft";
import { ApiEndpoints, ApiResponse, httpClient } from "@/config/axios";

export const getEvmNfts = async (
  address: string,
  page: number = 10,
  pageToken: string | undefined
) => {
  try {
    const response = (await httpClient.post(ApiEndpoints.GET_NFT_BY_OWNER, {
      id: 1,
      wallet_address: address,
      blockchain: [],
      page_size: page,
      page_token: pageToken,
    })) as ApiResponse<GetNFTsByOwnerReply>;

    if (!response.data.success) {
      throw new Error();
    }

    const nfts = response.data.ans.result;

    const nft: nftType[] = nfts.assets.map(
      ({
        tokenId,
        blockchain,
        name,
        symbol,
        collectionName,
        contractAddress,
        imageUrl,
      }) => {
        return {
          name,
          symbol,
          collectionName,
          contractAddress,
          image: imageUrl,
          blockchain,
          tokenId,
        };
      }
    );

    return nft.filter((nft) => nft.name);
  } catch (error) {
    console.log("ERROR NFT");
    console.log(error);
  }
};

export const getEvmNft = async (
  contractAddress: string,
  blockchain: Blockchain,
  tokenId: string
) => {
  try {
    const config = {
      id: 1,
      contract_address: contractAddress,
      blockchain,
      token_id: tokenId,
    };

    const response = (await httpClient.post(
      ApiEndpoints.GET_NFT_METADATA,
      config
    )) as ApiResponse<GetNFTMetadataReply>;

    if (!response.data.success) {
      throw new Error();
    }

    const nfts = response.data.ans.result;

    return nfts.attributes;
  } catch (error) {
    console.log("nft Error", error);
    throw error;
  }
};

type nftFeeProps = {
  fromAddress: string;
  toAddress: string;
  tokenId: string;
  blockchain: string;
  contractAddress: string;
  tokenStandart: string;
};

export const getNftFee = async ({
  fromAddress,
  toAddress,
  tokenId,
  blockchain,
  contractAddress,
  tokenStandart,
}: nftFeeProps) => {
  try {
    const config = {
      sender_address: fromAddress,
      receiver_address: toAddress,
      nft_token_id: tokenId,
      blockchain,
      nft_contract_address: contractAddress,
      token_standard: tokenStandart,
    };

    const response = (await httpClient.post(
      ApiEndpoints.CALCULATE_NFT_FEE,
      config
    )) as ApiResponse<GetNFTMetadataReply>;


    if (!response.data.success) {
      throw new Error();
    }

    const nfts = response.data;

    return nfts;
  } catch (error) {
    console.log("fee error", error);
    throw error;
  }
};

type nftTransfer = {
  fromAddress: string;
  toAddress: string;
  tokenId: string;
  blockchain: string;
  contractAddress: string;
  tokenStandart: string;
  privateKey: string;
  fee: string;
};

export const transferNft = async ({
  fromAddress,
  toAddress,
  tokenId,
  blockchain,
  contractAddress,
  tokenStandart,
  privateKey,
  fee,
}: nftTransfer) => {
  try {
    const config = {
      sender_address: fromAddress,
      receiver_address: toAddress,
      nft_token_id: tokenId,
      blockchain,
      nft_contract_address: contractAddress,
      token_standard: tokenStandart,
      calculated_gas_fee: fee,
      private_key: privateKey,
    };

    const response = (await httpClient.post(
      ApiEndpoints.NFT_TRANSFER,
      config
    )) as ApiResponse<GetNFTMetadataReply>;

    if (!response.data.success) {
      throw new Error();
    }
  } catch (error) {
    console.log("fee error", error);
    throw error;
  }
};
