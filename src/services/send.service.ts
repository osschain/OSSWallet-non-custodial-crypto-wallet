import { Contract, JsonRpcProvider, Wallet, getDefaultProvider, parseUnits, } from "ethers";

import { OSSblockchain } from "./history.service";

import { ERC20_ABI } from "@/config/abi";

export const sendTransaction = async ({ privateKey, toAddress, blockchain, contractAddress, amount }: { privateKey: string, toAddress: string, blockchain: OSSblockchain, contractAddress?: string, amount: string }) => {
    if (blockchain === "btc" || blockchain === "solana") {
        throw new Error("Cant send")
    }

    const endPoint = `https://rpc.ankr.com/${blockchain}/f7c0df84b43c7f9f2c529c76efc01da4b30271a66608da4728f9830ea17d29bc`

    try {

        const provider = new JsonRpcProvider(endPoint);
        const signer = new Wallet(privateKey, provider);
        const transferAmount = parseUnits(amount);
        const isToken = !!contractAddress
        if (isToken) {
            const token = new Contract(contractAddress, ERC20_ABI, signer);
            await token
                .transfer(toAddress, transferAmount)
        } else {
            const tx = await signer.sendTransaction({
                to: toAddress,
                value: transferAmount,

            });
        }
    } catch (error) {
        console.log(error, "ERRORS")
        throw error
    }

}