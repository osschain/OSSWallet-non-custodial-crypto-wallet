import { AssetType } from "@/@types/assets";

export default class HistoryManager {
    public assets: AssetType[];

    constructor(histories: AssetType[]) {
        this.assets = histories;
    }

}
