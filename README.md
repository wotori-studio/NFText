# NFText - from text to virtual worlds.
<img src="https://ipfs.io/ipfs/QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6" style="width:200px" />

## Concept
This project is about the collaboration between writers and artists in NFT creation. The goal is to allow people from all around the world to participate in art and virtual world creation. Even if you can't draw, you can start with text, imagine the character, and mint the description as an NFT. Then, someone who is good at painting and 3D will join your idea, and in the end, you'll have a visualization of text and a group of NFTs that can live in web 3.0 and virtual worlds.

## Features
Current release:
- Interface for minting different types of assets (text, image, and 3D)
- `.png`, `.jpg`, `.gif`, `.glb` support
- All content is stored in IPFS (InterPlanetary File System) using [Pinata](https://www.pinata.cloud/)
- Mint NFTs based on others
- Query parent and child NFTs in a modal window (explore section)
- Exchange Const to CW20 tokens with a sliding window
- Sell and buy NFTs for CW20 tokens
- Mint NFT collections
  
In progress:
- Mint project file tokens (Blender, Maya, zBrush, etc.)
- Draw pictures directly in the browser (in progress)
- Integrate CW721 with metadata on-chain + royalty
- Draw a tree of NFTs based on each other
- Live bridge for streaming 3D content into compiled game engines (cross-platform)

## Basic Interface
![image](https://i.ibb.co/6vTfFWq/image.png)

## Development & Requirements


### Smart Contracts
Most smart contracts used in NFText are in this [repository](https://github.com/wotori-studio/NFText-CosmWasm).
Basicaly this dApp builded with this CosmWasm smart contracts:
- [cw20-bounding](https://github.com/CosmWasm/cw-tokens/tree/main/contracts/cw20-bonding)
- [cw721-base](https://github.com/CosmWasm/cw-nfts/tree/test-resolver/contracts/cw721-base)
- [cw-marketplace](https://github.com/wotori-studio/CW-Marketplace)
- [instantiator](https://github.com/wotori/instantiator)

#### To run this project:

0. Deploy all required smart contracts.
1. Install any necessary dependencies.
2. Copy and paste `env.template` and rename it to `.env`.
3. Fill out the necessary fields in `.env`.
4. Run the project.


### Network
#### Constantine
```
NEXT_PUBLIC_CHAIN_ID=constantine-2
NEXT_PUBLIC_CHAIN_NAME=constantine
NEXT_PUBLIC_CHAIN_BECH32_PREFIX=archway
NEXT_PUBLIC_CHAIN_RPC_ENDPOINT=https://rpc.constantine-2.archway.tech:443
NEXT_PUBLIC_CHAIN_REST_ENDPOINT=https://api.constantine-2.archway.tech:443
NEXT_PUBLIC_STAKING_DENOM=uconst
NEXT_PUBLIC_FAUCET=https://faucet.constantine-2.archway.tech

```