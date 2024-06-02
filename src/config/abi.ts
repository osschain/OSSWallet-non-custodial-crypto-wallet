export const ERC721_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export const ERC1155_ABI = [
    "function uri(uint256 id) view returns (string)",
    "function balanceOf(address account, uint256 id) view returns (uint256)",
    "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)"
];

export const ERC20_ABI = [
    // Some details omitted
    // Read-Only Functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
];