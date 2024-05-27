import { HDNodeWallet } from "ethers";

import chains from "@/data/chains.json";
import { WalletType } from "@/providers/AssetProvider";

const BIP84 = require('bip84')

const BtcWallet = (seed: string) => {
  const root = new BIP84.fromMnemonic(seed)
  const child = root.deriveAccount(0)
  const wallet = new BIP84.fromZPrv(child)

  return {address: wallet.getAddress(0), publicKey: wallet.getPublicKey(0), privetKey: wallet.getPrivateKey(0)}
}

export const createAssets = (seed: string) => {
  try {
    const evmWallet = HDNodeWallet.fromPhrase(
      seed as string
    );
    
    const wallets = chains.map((chain) => {

      if(chain["slip-0044"]  === 60) {
        return {
          ...chain,
          wallet:  evmWallet as WalletType
        }
      } else if(chain["slip-0044"] === 0) {
        return {
          ...chain,
          wallet: BtcWallet(seed)
        }
      } else {
        return {
          ...chain,
          wallet:  evmWallet as WalletType
        }
      }

    });

    return wallets;
  } catch (error) {
    console.log(error);
  }
};
