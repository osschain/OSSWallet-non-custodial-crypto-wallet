import { AssetType } from "@/@types/assets";


export const findAsset = (assets: AssetType[] | undefined, slug: string) => {
    console.log(slug, "VAR")
    const asset = assets?.find((asset) => asset.id.toLocaleLowerCase() === slug.toLocaleLowerCase());
    console.log(slug)
    return asset
}