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

export const chains = [
  {
    id: 1,
    image: defaultImage,
    title: "oss",
    decription: "osschain",
  },
  {
    id: 2,
    image: defaultImage,
    title: "btc",
    decription: "bitcoin",
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
];
