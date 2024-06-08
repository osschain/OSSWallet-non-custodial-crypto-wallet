import { Blockchain } from "@ankr.com/ankr.js";
import { JsonRpcProvider, Contract } from "ethers";

import { ERC20_ABI } from "@/config/abi"

export const getContract = (address: string, blockchain: Blockchain) => {
    const endPoint = `https://rpc.ankr.com/${blockchain}/f7c0df84b43c7f9f2c529c76efc01da4b30271a66608da4728f9830ea17d29bc`;
    const provider = new JsonRpcProvider(endPoint);
    const contract = new Contract(address, ERC20_ABI, provider);


    return contract
}

export const getTokenProperties = async (address: string, blockchain: Blockchain) => {
    try {
        const contract = getContract(address, blockchain);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();

        return { name, symbol, decimals };
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch token data");
    }
};

export const isValidERC20Addres = (address: string) => {
    return typeof address === 'string' && address.length === 42 && address.startsWith('0x');
}
