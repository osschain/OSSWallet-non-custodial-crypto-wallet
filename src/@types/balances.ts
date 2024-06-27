export type BalancesType = { id: string; balance: string; balanceUsd: string };

export enum AddresTypes {
  evm = "eth",
  btc = "btc",
  solana = "solana",
}

export type AddressType = { address: string; type: AddresTypes };
