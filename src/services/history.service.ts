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

export type PageParam = { page: number; pageTokens: PageTokensType | undefined };

type EvmHistoryProps = {
  pageParam: PageParam;
  address: string;
  blockchain: Blockchain[];
};

export const getEvmHistory = async ({ address, pageParam, blockchain }: EvmHistoryProps) => {
  try {
    const { pageTokens } = pageParam || {};
    const isInitial = typeof pageTokens === 'undefined';
    const histories: HistoryType[] = [];
    const pageTokensHolder: PageTokensType = {
      nft: undefined,
      token: undefined,
      chain: undefined,
    };

    const tokenHistoryPromise = (pageTokens?.token || isInitial) && getEvmTokenHistories({ address, blockchain, pageParam });
    const chainHistoryPromise = (pageTokens?.chain || isInitial) && getEvmChainHistories({ address, blockchain, pageParam });
    const nftHistoryPromise = (pageTokens?.nft || isInitial) && getEvmNftHistories({ address, blockchain, pageParam });

    const [tokenHistory, chainHistory, nftHistory] = await Promise.all([tokenHistoryPromise, chainHistoryPromise, nftHistoryPromise]);

    if (tokenHistory) {
      pageTokensHolder.token = tokenHistory.pageToken;
      histories.push(...tokenHistory.histories);
    }

    if (chainHistory) {
      pageTokensHolder.chain = chainHistory.pageToken;
      histories.push(...chainHistory.histories);
    }

    if (nftHistory) {
      pageTokensHolder.nft = nftHistory.pageToken;
      histories.push(...nftHistory.histories);
    }

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
  pageParam: PageParam;
};

const mapChainHistory = ({
  hash,
  timestamp,
  gasPrice,
  gasUsed,
  nonce,
  to,
  from,
  value,
  blockchain,
}: GetTransactionsByAddressReply['transactions'][0]): HistoryType | undefined => {
  if (!blockchain || !to) return;

  return {
    to,
    from,
    id: blockchain,
    key: uuidv4(),
    value: formatEther(value),
    blockchain: blockchain as OSSblockchain,
    nonce,
    fee: Number(gasPrice) * Number(gasUsed),
    date: timestamp ? unixTimestampToDate(timestamp) : undefined,
    hash,
    type: "TOKEN",
  };
};

export const getEvmChainHistories = async ({ address, blockchain, pageParam }: EvmHistoriesParams) => {
  const { page, pageTokens } = pageParam;

  try {
    const response = await httpClient.post(ApiEndpoints.GET_CHAIN_TRANSFER, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageTokens?.chain,
    }) as ApiResponse<GetTransactionsByAddressReply>;

    if (!response.data.success) {
      throw new Error('Failed to fetch chain histories');
    }

    const transactions = response.data.ans.result;
    const histories = transactions.transactions.map(mapChainHistory).filter(Boolean) as HistoryType[];

    return { histories, pageToken: transactions.nextPageToken };
  } catch (error) {
    console.error("Chain History Error:", error);
    throw error;
  }
};

const mapTokenHistory = ({
  transactionHash,
  timestamp,
  blockchain,
  toAddress,
  fromAddress,
  value,
  contractAddress,
}: GetTokenTransfersReply['transfers'][0]): HistoryType | undefined => {
  if (!contractAddress || !toAddress || !fromAddress) return;

  return {
    to: toAddress,
    from: fromAddress,
    id: contractAddress,
    key: uuidv4(),
    value,
    blockchain: blockchain as OSSblockchain,
    date: timestamp ? unixTimestampToDate(timestamp) : undefined,
    hash: transactionHash,
    type: "TOKEN",
  };
};

export const getEvmTokenHistories = async ({ address, blockchain, pageParam }: EvmHistoriesParams) => {
  const { page, pageTokens } = pageParam;

  try {
    const response = await httpClient.post(ApiEndpoints.GET_TOKEN_TRANSFER, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageTokens?.token,
    }) as ApiResponse<GetTokenTransfersReply>;

    const transactions = response.data.ans.result;
    const histories = transactions.transfers.map(mapTokenHistory).filter(Boolean) as HistoryType[];

    return { histories, pageToken: transactions.nextPageToken };
  } catch (error) {
    console.error("Token History Error:", error);
    throw error;
  }
};

const mapNftHistory = ({
  transactionHash,
  timestamp,
  toAddress,
  fromAddress,
  value,
  blockchain,
}: GetNftTransfersReply['transfers'][0]): HistoryType => ({
  to: toAddress,
  from: fromAddress,
  id: blockchain,
  key: uuidv4(),
  value: formatEther(value),
  blockchain: blockchain as OSSblockchain,
  date: timestamp ? unixTimestampToDate(timestamp) : undefined,
  hash: transactionHash,
  type: "NFT",
});

export const getEvmNftHistories = async ({ address, blockchain, pageParam }: EvmHistoriesParams) => {
  const { page, pageTokens } = pageParam;

  try {
    const response = await httpClient.post(ApiEndpoints.GET_NFT_TRANSFERS, {
      id: 1,
      wallet_address: address,
      blockchain: Array.isArray(blockchain) ? blockchain : [blockchain],
      page_size: page,
      page_token: pageTokens?.nft,
    }) as ApiResponse<GetNftTransfersReply>;

    if (!response.data.success) {
      throw new Error('Failed to fetch NFT histories');
    }

    const transactions = response.data.ans.result.transfers;
    const histories = transactions.map(mapNftHistory).filter(Boolean) as HistoryType[];

    return { histories, pageToken: response.data.ans.result.nextPageToken };
  } catch (error) {
    console.error("NFT History Error:", error);
    throw error;
  }
};
