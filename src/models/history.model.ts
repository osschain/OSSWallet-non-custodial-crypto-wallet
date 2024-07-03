import { HistoryType } from "@/@types/history";

export type PageTokensType = {
    token: string | undefined;
    nft: string | undefined;
    chain: string | undefined;
}

export default class History {

    public histories: HistoryType[];
    public pageTokens: PageTokensType;

    constructor(histories: HistoryType[], pageTokens: PageTokensType) {
        this.histories = histories;
        this.pageTokens = pageTokens;
    }

    get hasPageToken(): boolean {
        return Object.values(this.pageTokens).some(value => value !== undefined);
    }
}
