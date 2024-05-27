import { HDNodeWallet } from "ethers";

import chains from "@/data/chains.json";
import { WalletType } from "@/providers/AssetProvider";

const BIP84 = require('bip84')

const BtcAccount = (seed: string) => {
  const root = new BIP84.fromMnemonic(seed)
  const child = root.deriveAccount(0)
  const account = new BIP84.fromZPrv(child)

  return {address: account.getAddress(0), publicKey: account.getPublicKey(0), privetKey: account.getPrivateKey(0)}
}

export const createAssets = (seed: string) => {
  try {
    const evmAccount = HDNodeWallet.fromPhrase(
      seed as string
    );
    
    const assets = chains.map((chain) => {

      if(chain["slip-0044"]  === 60) {
        return {
          ...chain,
          account:  evmAccount as WalletType
        }
      } else if(chain["slip-0044"] === 0) {
        return {
          ...chain,
          account: BtcAccount(seed)
        }
      } else {
        return {
          ...chain,
          account:  evmAccount as WalletType
        }
      }

    });

    return assets;
  } catch (error) {
    console.log(error);
  }
};
