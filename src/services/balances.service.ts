
import { AssetType } from "@/@types/assets";
import { AddresTypes, BalancesType, AddressType } from "@/@types/balances";
import { ApiEndpoints, httpClient } from "@/config/axios";

export const totalBalance = (balances: BalancesType[] | undefined) => {
  const balance = balances?.reduce((prev, current) => {
    return Number(current.balanceUsd) + prev;
  }, 0);

  if (balance === 0) return balance;
  return Number(balance?.toFixed(2));
};

export const calculateBalance = (
  id: string,
  balances: BalancesType[] | undefined
) => {
  const balance = Number(
    balances?.find((balance) => {
      return id.toLowerCase() === balance.id.toLowerCase();
    })?.balance || 0
  );

  return balance;
};

export const calculateUsdBalance = (
  id: string,
  balances: BalancesType[] | undefined
) => {
  const balance = Number(
    balances?.find((balance) => id.toLowerCase() === balance.id.toLowerCase())
      ?.balanceUsd || 0
  );

  return balance;
};

export const getAddress = (assets: AssetType[], type: AddresTypes) => {
  try {
    const address = assets.find((asset) => asset.blockchain === type)?.account
      .address;
    return address as string;
  } catch {
    throw new Error("Can't find adress");
  }
};

export const getAdresses = (assets: AssetType[] | undefined) => {
  if (!assets) {
    throw new Error("Asset is not presented");
  }

  const evmAdress = getAddress(assets, AddresTypes.evm);
  const btcAddress = getAddress(assets, AddresTypes.btc);
  const solanaAddres = getAddress(assets, AddresTypes.solana);

  const addresses: AddressType[] = [
    { address: evmAdress, type: AddresTypes.evm },
    { address: btcAddress, type: AddresTypes.btc },
    { address: solanaAddres, type: AddresTypes.solana },
  ];
  return addresses;
};

export const getEvmBalance = async (
  address: string,
  blockchain: string,
  contractAddress: string,
  symbol: string
) => {
  try {
    const response = await httpClient.post(ApiEndpoints.GET_ACCOUNT_BALANCE, {
      wallet_address: address,
      blockchain,
      token_contract_address: contractAddress,
      token_symbol: symbol,
    });

    if (!response.data.success) {
      throw new Error();
    }
    if (response.data.balance_native) {
      return {
        balance: response.data.balance_native,
        price: response.data.native_price,
      };
    } else {
      return {
        balance: response.data.token_balance,
        price: response.data.native_price,
      };
    }
  } catch (error) {
    console.log("balance", error);
    throw error;
  }
};
