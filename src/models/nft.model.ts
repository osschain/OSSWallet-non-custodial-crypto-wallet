import { nftType } from "@/@types/nft";

export type NftPageTokensType = {
    evm: string | undefined;
}

export default class Nft {

    public nfts: nftType[];
    public pageTokens: NftPageTokensType;

    constructor(nfts: nftType[], pageTokens: NftPageTokensType) {
        this.nfts = nfts;
        this.pageTokens = pageTokens;
    }

    get hasPageToken(): boolean {
        return Object.values(this.pageTokens).some(value => value !== undefined);
    }
}
