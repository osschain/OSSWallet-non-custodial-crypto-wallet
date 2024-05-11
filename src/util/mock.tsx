import { defaultImage } from "./DefaultImage";

export const mockedSeed =
  "apple banana carrot dog elephant fountain guitar helicopter iguana jellyfish kangaroo laptop";

export const networks = [
  {
    id: 1,
    image: defaultImage,
    label: "Acala",
  },
  {
    id: 2,
    image: defaultImage,
    label: "bitcoin",
  },
];

export const history = [
  {
    id: 1,
    send: 150,
    recieved: 0,
    title: "oss",
    decription: "osschain",
    walletAddress: "0x12230x23kj123",
  },
  {
    id: 2,
    send: 0,
    recieved: 15,
    title: "btc",
    decription: "bitcoin",
    walletAddress: "0x12230x23kj123",
  },
  {
    id: 3,
    send: 0,
    recieved: 15,
    title: "btc",
    decription: "bitcoin",
    walletAddress: "0x12230x23kj123",
  },
  {
    id: 4,
    send: 0,
    recieved: 15,
    title: "btc",
    decription: "bitcoin",
    walletAddress: "0x12230x23kj123",
  },
  {
    id: 5,
    send: 0,
    recieved: 15,
    title: "btc",
    decription: "bitcoin",
    walletAddress: "0x12230x23kj123",
  },

  {
    id: 6,
    send: 0,
    recieved: 15,
    title: "btc",
    decription: "bitcoin",
    walletAddress: "0x12230x23kj123",
  },
  {
    id: 7,
    send: 0,
    recieved: 15,
    title: "btc",
    decription: "bitcoin",
    walletAddress: "0x12230x23kj123",
  },
];

export type Asset = {
  id: number;
  image: string;
  title: string;
  description: string;
  quantity: number;
  usdQuantity: number;
};

export const assets = [
  {
    id: 1,
    image: defaultImage,
    title: "oss",
    description: "oss token",
    quantity: 54,
    usdQuantity: 1520,
  },
  {
    id: 2,
    image: defaultImage,
    title: "btc",
    description: "btc token",
    quantity: 12,
    usdQuantity: 15,
  },
  {
    id: 3,
    image: defaultImage,
    title: "eth",
    description: "btc token",

    quantity: 13,
    usdQuantity: 15,
  },
  {
    id: 4,
    image: defaultImage,
    title: "ltc",
    quantity: 14,
    description: "btc token",

    usdQuantity: 15,
  },
  {
    id: 5,
    image: defaultImage,
    title: "usd",
    description: "btc token",

    quantity: 16,
    usdQuantity: 15,
  },
  {
    id: 6,
    image: defaultImage,
    title: "eth2",
    quantity: 4,
    description: "btc token",
    usdQuantity: 15,
  },
];

export const nfts = [
  {
    id: 1,
    title: "The Groovy",
    collection: "Floor 189 - NFT Collection",
  },
  {
    id: 2,
    title: "The Groovy",
    collection: "Tegro Metaverse",
  },
  {
    id: 3,
    title: "The Groovy",
    collection: "Floor 6 - NFT Collection",
  },
];
