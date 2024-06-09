import { Blockchain } from "@ankr.com/ankr.js";

import { AssetType } from "@/@types/assets";
import { AddresTypes } from "@/@types/balances";
import { getAddress } from "@/services/balances.service";
import { OSSblockchain } from "@/services/history.service";


export default class AssetsManager {
    public assets: AssetType[];

    constructor(assets: AssetType[]) {
        this.assets = assets;
    }

    get btcAddress(): string | null {
        return this.getAddressByType(AddresTypes.btc);
    }

    get evmAddress(): string | null {
        return this.getAddressByType(AddresTypes.evm);
    }

    get solanaAddress(): string | null {
        return this.getAddressByType(AddresTypes.solana);
    }

    get shownBlockchains(): OSSblockchain[] {
        return this.assets.filter(asset => asset.isShown).map(asset => asset.blockchain);
    }


    get getEVMBlockchainsString(): Blockchain {
        const evmBlockchains = this.assets
            .filter(asset => asset["slip-0044"] === 60)
            .map(asset => asset.blockchain) as unknown as Blockchain;

        return evmBlockchains;
    }

    private getAddressByType(type: AddresTypes): string | null {
        try {
            return getAddress(this.assets, type);
        } catch (error) {
            console.error(`Error fetching address of type ${type}:`, error);
            return null;
        }
    }
}
