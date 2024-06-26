import { HDNodeWallet } from "ethers";

import { AssetType } from "@/@types/assets";
import chains from "@/data/chains.json";
import { encrypt } from "@/util/es";

const bip39 = require("bip39");
const BIP84 = require('bip84')
const bs58 = require("bs58");
const { derivePath } = require("ed25519-hd-key");
const nacl = require("tweetnacl");


const solanaAccount = async (mnemonic: string, password: string) => {
    try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const path = "m/44'/501'/0'";
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed.slice(0, 32));

        const address = bs58.encode(keypair.publicKey)
        const privateKey = bs58.encode(keypair.secretKey)


        return { address, publicKey: address, privetKey: await encrypt(privateKey, password) }
    } catch {
        throw new Error("error at solanaAccount creating");
    }

};

const btcAccount = async (mnemonic: string, password: string) => {
    try {
        const root = new BIP84.fromMnemonic(mnemonic)
        const child = root.deriveAccount(0)
        const account = new BIP84.fromZPrv(child)

        return { address: account.getAddress(0), publicKey: account.getPublicKey(0), privetKey: encrypt(account.getPrivateKey(0), password) }
    } catch (error) {
        console.log(error)
        throw new Error("error at btc creating");
    }
}

export const createAssets = async (mnemonic: string, password: string) => {
    if (!mnemonic) {
        console.log(' Mnemonic')
        return;
    }

    try {
        const evmAccount = HDNodeWallet.fromPhrase(
            mnemonic as string
        );

        const assets = await Promise.all(chains.map(async (chain) => {
            if (chain["slip-0044"] === 60) {
                return {
                    ...chain,
                    account: {
                        privateKey: await encrypt(evmAccount.privateKey, password),
                        publicKey: evmAccount.publicKey,
                        address: evmAccount.address
                    }
                };
            } else if (chain["slip-0044"] === 0) {
                const account = await btcAccount(mnemonic, password)
                return {
                    ...chain,
                    account
                };
            } else if (chain["slip-0044"] === 501) {
                const account = await solanaAccount(mnemonic, password);
                return {
                    ...chain,
                    account
                };
            }
        }));

        return assets as AssetType[];
    } catch (error) {
        console.log(error);
        throw error
    }
};

