import { Blockchain } from "@ankr.com/ankr.js";
import { JsonRpcProvider, Contract } from "ethers";

import { ERC20_ABI } from "@/config/abi"
export const getTokenProperties = async (address: string, blockchain: Blockchain) => {
    const endPoint = `https://rpc.ankr.com/${blockchain}/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55`;
    try {
        const provider = new JsonRpcProvider(endPoint);
        const contract = new Contract(address, ERC20_ABI, provider);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        return { name, symbol, decimals };
    } catch {
        throw new Error("Failed to fetch token data");
    }
};

export const isValidERC20Addres = (address: string) => {
    return typeof address === 'string' && address.length === 42 && address.startsWith('0x');
}
