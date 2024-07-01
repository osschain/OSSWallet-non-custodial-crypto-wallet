import { Blockchain } from "@ankr.com/ankr.js";
import { JsonRpcProvider, Contract } from "ethers";

import { AssetType, TokenpropertiesType } from "@/@types/assets";
import { ERC20_ABI } from "@/config/abi"

export const getContract = (address: string, blockchain: Blockchain) => {
    const endPoint = ``;
    const provider = new JsonRpcProvider(endPoint);
    const contract = new Contract(address, ERC20_ABI, provider);


    return contract
}

export const getTokenProperties = async (address: string, blockchain: Blockchain) => {
    try {
        throw Error()
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



export const generateEvmAsset = (tokenProperties: TokenpropertiesType, assets: AssetType[]) => {

    const ethAccount = assets?.find((asset) => asset.blockchain === "eth");

    const { address, name, symbol, network } = tokenProperties;

    if (!ethAccount) return;

    const asset: AssetType = {
        id: address,
        icon: "https://assets.osschain.com/icon/custom.svg",
        name,
        symbol,
        blockchain: network,
        account: ethAccount?.account,
        contractAddress: address,
        isShown: true,
        isNetwork: false,
        "slip-0044": 60,
    };

    return asset;
};
