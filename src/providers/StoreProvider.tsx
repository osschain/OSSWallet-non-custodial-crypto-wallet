import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AssetType } from "@/@types/assets";
import { AddresTypes, AddressType } from "@/@types/balances";
import { useAssets } from "@/app/api/assets";
import { getAddress, getAdresses } from "@/services/balances.service";
import { OSSblockchain } from "@/services/history.service";

type StoreData = {
  evmAddress: string | null;
  solanaAddress: string | null;
  btcAddress: string | null;
  addresses: AddressType[] | null;
  shownedAssets: AssetType[] | null;
};

const StoreContext = createContext<StoreData>({
  evmAddress: null,
  solanaAddress: null,
  btcAddress: null,
  shownedAssets: null,
  addresses: null,
});

export default function StoreProvider({ children }: PropsWithChildren) {
  const { data: assets } = useAssets();

  const [evmAddress, setEvmAddress] = useState<string | null>(null);
  const [btcAddress, setBtcAddress] = useState<string | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressType[] | null>(null);
  const [shownedAssets, setShownedAssets] = useState<AssetType[] | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (assets) {
        setupAddresses();
      }
    };

    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  const setupAddresses = () => {
    if (!assets) return;

    const evm = getAddress(assets, AddresTypes.evm);
    const btc = getAddress(assets, AddresTypes.btc);
    const sol = getAddress(assets, AddresTypes.solana);

    const addresses = getAdresses(assets);
    const shownedAssets = assets.filter((asset) => asset.isShown);

    setBtcAddress(btc);
    setSolanaAddress(sol);
    setEvmAddress(evm);

    setShownedAssets(shownedAssets);
    setAddresses(addresses);
  };

  return (
    <StoreContext.Provider
      value={{
        evmAddress,
        btcAddress,
        solanaAddress,
        addresses,
        shownedAssets,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
