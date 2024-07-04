import {
  Blockchain,
  GetTokenTransfersReply,
  GetTransactionsByAddressReply,
} from "@ankr.com/ankr.js";
import { formatEther } from "ethers";
import { v4 as uuidv4 } from "uuid";

import { HistoryType } from "@/@types/history";
import { ApiEndpoints, ApiResponse, httpClient } from "@/config/axios";
import History, { PageTokensType } from "@/models/history.model";
import { unixTimestampToDate } from "@/util/unixToDate";

type EvmHistoryProps = {
  pageParam: { page: number, pageTokens: PageTokensType | undefined };
  address: string;
  blockchain: Blockchain[]
}

export const getEvmHistory = async (
  { address, pageParam, blockchain }: EvmHistoryProps
) => {
  try {
    const { page, pageTokens } = pageParam || {}
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
        page,
        pageToken: pageTokens?.token,
      });
      pageTokensHolder.token = tokenHistory.pageToken
      console.log(pageTokensHolder)

      histories.push(...tokenHistory.histories)
    }
    if (pageTokens?.chain || isInitial) {

      const chainHistory = await getEvmChainHistories({
        address,
        blockchain,
        page,
        pageToken: pageTokens?.chain,
      });

      pageTokensHolder.chain = chainHistory.pageToken
      histories.push(...chainHistory.histories)
    }

    if (pageTokens?.nft || isInitial) {
      const nftHistory = await getEvmNftHistories({
        address,
        blockchain,
        page,
        pageToken: pageTokens?.nft,
      });

      // pageTokensHolder.nft = nftHistory.pagetoken
      // histories.push(...nftHistory.history)
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
  page: number;
  pageToken: undefined | string;
};

export const getEvmChainHistories = async ({
  address,
  blockchain,
  page,
  pageToken,
}: EvmHistoriesParams) => {

  try {
    const response = (await httpClient.post(ApiEndpoints.GET_CHAIN_TRANSFER, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageToken,
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
  page,
  pageToken,
}: EvmHistoriesParams) => {


  try {
    const response = (await httpClient.post(ApiEndpoints.GET_TOKEN_TRANSFER, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageToken,
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
  page,
  pageToken,
}: EvmHistoriesParams) => {

  try {
    const response = (await httpClient.post(ApiEndpoints.GET_NFT_TRANSFERS, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageToken,
    })) as ApiResponse<GetTransactionsByAddressReply>;



    if (!response.data.success) {
      throw new Error();
    }

    // const transactions = response.data.ans.result;
    // const histories = transactions.transactions
    //   .map(
    //     ({
    //       hash,
    //       timestamp,
    //       gasPrice,
    //       gasUsed,
    //       nonce,
    //       to,
    //       from,
    //       value,
    //       blockchain,
    //     }) => {
    //       if (!blockchain || !to) {
    //         return;
    //       }

    //       return {
    //         to,
    //         from,
    //         id: blockchain,
    //         key: uuidv4(),
    //         value: formatEther(value),
    //         blockchain: blockchain as OSSblockchain,
    //         nonce,
    //         fee: Number(gasPrice) * Number(gasUsed),
    //         date: timestamp ? unixTimestampToDate(timestamp) : null,
    //         hash,
    //       };
    //     }
    //   )
    //   .filter(Boolean) as HistoryType[];

    // return new History(histories, transactions.nextPageToken);
  } catch (error) {
    throw error;
  }
};
