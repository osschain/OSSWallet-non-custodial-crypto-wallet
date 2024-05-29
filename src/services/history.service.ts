import { AnkrProvider } from "@ankr.com/ankr.js";

import { addressType } from "./balances.service";
import { AssetType } from "@/providers/AssetProvider";
import { AssetHistoryType, HistoryType } from "@/providers/AssetHistoryProvider";

const provider = new AnkrProvider(
    "https://rpc.ankr.com/multichain/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
);


export const getHistories = async (addresses: addressType[]) => {
    const result: HistoryType[] = []
    for (const { address, name } of addresses) {
        if (name === "Ether") {
            const histories = await provider.getTransactionsByAddress({
                blockchain: ['eth', "polygon",],
                address: [address],
                pageSize: 1,
                descOrder: true,
            });

            const filtered = histories.transactions.map(({ to, from, value }) => {
                return {
                    to,
                    from,
                    value
                }
            })

            result.push(...filtered)

        }
    }

    return result
}