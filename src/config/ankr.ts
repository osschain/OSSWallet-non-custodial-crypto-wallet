import { AnkrProvider } from "@ankr.com/ankr.js";

import { multyChainEndpoint } from "./endpoints";

export const ankrProvider = new AnkrProvider(
    multyChainEndpoint
);

