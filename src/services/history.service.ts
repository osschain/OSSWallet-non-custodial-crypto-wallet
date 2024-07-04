import {
  Blockchain,
  GetNftTransfersReply,
  GetTokenTransfersReply,
  GetTransactionsByAddressReply,
} from "@ankr.com/ankr.js";
import { formatEther } from "ethers";
import { v4 as uuidv4 } from "uuid";

import { HistoryType } from "@/@types/history";
import { ApiEndpoints, ApiResponse, httpClient } from "@/config/axios";
import History, { PageTokensType } from "@/models/history.model";
import { unixTimestampToDate } from "@/util/unixToDate";

export type PageParam = { page: number, pageTokens: PageTokensType | undefined };

type EvmHistoryProps = {
  pageParam: PageParam;
  address: string;
  blockchain: Blockchain[]
}

export const getEvmHistory = async (
  { address, pageParam, blockchain }: EvmHistoryProps
) => {
  try {
    const { pageTokens } = pageParam || {}
    const isInitial = typeof pageTokens === 'undefined'
    const histories: HistoryType[] = [];
    const pageTokensHolder: PageTokensType = {
      nft: undefined,
      token: undefined,
      chain: undefined
    }
    if (pageTokens?.token || isInitial) {
      const tokenHistory = await getEvmTokenHistories({
        address,
        blockchain,
        pageParam
      });
      pageTokensHolder.token = tokenHistory.pageToken
      console.log(pageTokensHolder)

      histories.push(...tokenHistory.histories)
    }
    if (pageTokens?.chain || isInitial) {

      const chainHistory = await getEvmChainHistories({
        address,
        blockchain,
        pageParam
      });

      pageTokensHolder.chain = chainHistory.pageToken
      histories.push(...chainHistory.histories)
    }

    if (pageTokens?.nft || isInitial) {
      const nftHistory = await getEvmNftHistories({
        address,
        blockchain,
        pageParam,
      });

      pageTokensHolder.nft = nftHistory.pageToken
      histories.push(...nftHistory.histories)
    }
    console.log(pageTokensHolder)

    return new History(histories, { token: pageTokensHolder.token, chain: pageTokensHolder.chain, nft: pageTokensHolder.nft });

  } catch (error) {
    console.error("Error fetching histories:", error);
    throw error;
  }
};

export type OSSblockchain = Blockchain | "solana" | "btc";

type EvmHistoriesParams = {
  address: string;
  blockchain: Blockchain[] | Blockchain;
  pageParam: PageParam
};

export const getEvmChainHistories = async ({
  address,
  blockchain,
  pageParam
}: EvmHistoriesParams) => {



  const { page, pageTokens } = pageParam

  try {
    const response = (await httpClient.post(ApiEndpoints.GET_CHAIN_TRANSFER, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageTokens?.chain
      ,
    })) as ApiResponse<GetTransactionsByAddressReply>;

    if (!response.data.success) {
      throw new Error();
    }

    const transactions = response.data.ans.result;

    const histories = transactions.transactions
      .map(
        ({
          hash,
          timestamp,
          gasPrice,
          gasUsed,
          nonce,
          to,
          from,
          value,
          blockchain,
        }) => {
          if (!blockchain || !to) {
            return;
          }

          return {
            to,
            from,
            id: blockchain,
            key: uuidv4(),
            value: formatEther(value),
            blockchain: blockchain as OSSblockchain,
            nonce,
            fee: Number(gasPrice) * Number(gasUsed),
            date: timestamp ? unixTimestampToDate(timestamp) : null,
            hash,
            type: "TOKEN"
          };
        }
      )
      .filter(Boolean) as HistoryType[];
    console.log(transactions.nextPageToken)

    return { histories, pageToken: transactions.nextPageToken };
  } catch (error) {
    console.log(error, "chain HISTORY ERROR")
    throw error;
  }
};

export const getEvmTokenHistories = async ({
  address,
  blockchain,
  pageParam
}: EvmHistoriesParams) => {

  const { page, pageTokens } = pageParam
  try {
    const response = (await httpClient.post(ApiEndpoints.GET_TOKEN_TRANSFER, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageTokens?.token,
    })) as ApiResponse<GetTokenTransfersReply>;
    const transactions = response.data.ans.result;

    const histories = transactions.transfers
      .map(
        ({
          transactionHash,
          timestamp,
          blockchain,
          toAddress,
          fromAddress,
          value,
          contractAddress,
        }) => {
          if (!contractAddress || !toAddress || !fromAddress) {
            return;
          }

          return {
            to: toAddress,
            from: fromAddress,
            id: contractAddress,
            key: uuidv4(),
            value,
            blockchain: blockchain as OSSblockchain,
            date: timestamp ? unixTimestampToDate(timestamp) : null,
            hash: transactionHash,
            type: "TOKEN"
          };
        }
      )
      .filter(Boolean) as HistoryType[];
    return { histories, pageToken: transactions.nextPageToken };
  } catch (error) {
    console.log(error, "TOKEN HISTORY ERROR");
    throw error;
  }
};

export const getEvmNftHistories = async ({
  address,
  blockchain,
  pageParam
}: EvmHistoriesParams) => {
  const { page, pageTokens } = pageParam
  try {
    const response = (await httpClient.post(ApiEndpoints.GET_NFT_TRANSFERS, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageTokens?.nft,
    })) as ApiResponse<GetNftTransfersReply>;



    if (!response.data.success) {
      throw new Error();
    }

    const transactions = response.data.ans.result.transfers;

    const histories = transactions
      .map(
        ({
          transactionHash,
          timestamp,
          toAddress,
          fromAddress,
          value,
          blockchain,

        }) => {
          return {
            to: toAddress,
            from: fromAddress,
            id: blockchain,
            key: uuidv4(),
            value: formatEther(value),
            blockchain: blockchain as OSSblockchain,
            date: timestamp ? unixTimestampToDate(timestamp) : null,
            hash: transactionHash,
            type: "NFT"
          };
        }
      )
      .filter(Boolean) as HistoryType[];
    return { histories, pageToken: response.data.ans.result.nextPageToken };

  } catch (error) {
    throw error;
  }
};
