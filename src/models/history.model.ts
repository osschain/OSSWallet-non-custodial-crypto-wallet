import { HistoryType } from "@/@types/history";

export default class History {
    public histories: HistoryType[];
    public nextPageToken: string | undefined;

    constructor(histories: HistoryType[], nextPageToken: string | undefined) {
        this.histories = histories;
        this.nextPageToken = nextPageToken;
    }
}
