import { Blockchain } from "@ankr.com/ankr.js";


export const chainIds = {
    "arbitrum": 42161, // Official Chain ID for Arbitrum One
    "avalanche": 43114, // Official Chain ID for Avalanche C-Chain
    "avalanche_fuji": 43113, // Official Chain ID for Avalanche Fuji Testnet
    "base": 8453, // Official Chain ID for Base Mainnet
    "bsc": 56, // Official Chain ID for Binance Smart Chain
    "ethereum": 1, // Official Chain ID for Ethereum Mainnet
    "eth_goerli": 5, // Official Chain ID for Ethereum Goerli Testnet
    "fantom": 250, // Official Chain ID for Fantom Opera
    "flare": 14, // Official Chain ID for Flare Mainnet
    "gnosis": 100, // Official Chain ID for Gnosis Chain (formerly xDai)
    "linea": 59144, // Official Chain ID for Linea Mainnet
    "optimism": 10, // Official Chain ID for Optimism Mainnet
    "optimism_testnet": 420, // Official Chain ID for Optimism Goerli Testnet
    "polygon": 137, // Official Chain ID for Polygon (Matic) Mainnet
    "polygon_mumbai": 80001, // Official Chain ID for Polygon Mumbai Testnet
    "polygon_zkevm": 1101, // Official Chain ID for Polygon zkEVM Mainnet
    "rollux": 570, // Official Chain ID for Rollux Mainnet (part of Syscoin)
    "scroll": 534352, // Official Chain ID for Scroll Mainnet
    "syscoin": 57, // Official Chain ID for Syscoin Mainnet
    "btc": 0, // Not applicable, but traditionally BTC is identified as 0
    "solana": 101, // Solana does not use EVM-based Chain IDs, but it’s often referenced with 101 for Mainnet Beta
};


export const blockhainToTatumChains: { [key: string]: string } = {
    polygon: "MATIC",
    ethereum: "ETH",
    bsc: "BSC",
}




export const blockchains: Blockchain[] = ["polygon", "eth", "polygon", "bsc", "avalanche", "polygon_zkevm", "optimism"]