import { AssetType } from "@/@types/assets";


export const findAsset = (assets: AssetType[] | undefined, slug: string) => {
    const asset = assets?.find((asset) => asset.id === slug);
    return asset
}