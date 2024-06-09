import { Blockchain } from "@ankr.com/ankr.js";

import { AssetType } from "@/@types/assets";
import { AddresTypes } from "@/@types/balances";
import { getAddress } from "@/services/balances.service";


export default class AssetsManager {
    public assets: AssetType[];

    constructor(assets: AssetType[]) {
        this.assets = assets;
    }

    get btcAddress(): string {
        return getAddress(this.assets, AddresTypes.btc);
    }

    get evmAddress(): string {
        return getAddress(this.assets, AddresTypes.evm);
    }

    get solanaAddress(): string {
        return getAddress(this.assets, AddresTypes.solana);
    }

    get shownBlockchains(): AssetType[] {
        return this.assets.filter(asset => asset.isShown)
    }


    get ids(): string[] {
        return this.assets.map(asset => asset.id.toLowerCase())
    }

    get shownIds(): string[] {
        return this.shownBlockchains.map(asset => asset.id.toLowerCase())
    }

    get getEvmlockchains(): AssetType[] {
        const evmBlockchains = this.assets
            .filter(asset => asset["slip-0044"] === 60)

        return evmBlockchains;
    }

    get shownEvmBlockchain(): Blockchain[] {
        const shownedAssets = this.assets.filter(asset => asset.isShown)

        const evmBlockchains = Array.from(new Set(shownedAssets.filter((asset) => asset["slip-0044"]
            === 60).map(asset => asset.blockchain))) as Blockchain[]

        return evmBlockchains;
    }


}
