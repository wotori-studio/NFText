# NFText - from text to virtual worlds.
<img src="https://ipfs.io/ipfs/QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6" style="width:200px" />

## Concept
This project about collaboration between writers and artists in NFT creation.
The goal is -  to allow all around the world participate in art and vitual world creation. Even If you can't draw, start from text, Imagine the character and mint the description as NFT. Then someone who good at painting and 3D will join your Idea and at the and you'll have a visualisation of text and group NFT that able to live in web 3.0 and virtual worlds...

## Features
Current release:
- interface for minting different types of assets (text, img and 3D)
- .png, .jpg, gif, .glb support
- all content stores in ipfs (InterPlanetary File System) using [pinata](https://www.pinata.cloud/)
- mint NFT based on others
- query parent & child NFTs in modal window (explore section)
- exchange Torii to cw20 and back back with sliding window
- sell & buy nfts for cw20 tokens
  
In progress:
- mint project file token (blender, maya, zBrush, e.t.c.)
- draw picture directly in browser (in progress)
- integrate cw721 with metadata on-chain + royality
- draw tree of nft based on each others
- live bridge for streaming 3D content intro compiled game engines (crossplatform)

## Basic Interface
![image](https://i.ibb.co/6vTfFWq/image.png)

## Development & Requirements


### Smart Contracts
All smart contracts used in NFText are in this [repository](https://github.com/wotori-studio/NFText-CosmWasm).
Basicaly this dApp builded with this CosmWasm smart contracts:
- [cw20-bounding](https://github.com/CosmWasm/cw-tokens/tree/main/contracts/cw20-bonding)
- [cw721-base](https://github.com/CosmWasm/cw-nfts/tree/test-resolver/contracts/cw721-base)
- [cw-marketplace](https://github.com/wotori-studio/CW-Marketplace)

#### Run this project
- copy-paste `env.template` && rename It to `.env`
- fullfill It

```sh
% yarn install
% yarn dev
```

### Networks
#### Constantine
```
{
  "chain-id": "constantine-1",
  "rpc": "https://rpc.constantine-1.archway.tech:443",
  "rest-api": "https://api.constantine-1.archway.tech",
  "currency-denom": "uconst",
}
```
#### Torii

```
{
  "chain-id": "torii-1",
  "rpc": "https://rpc.torii-1.archway.tech:443",
  "rest-api": "https://api.torii-1.archway.tech:443",
  "currency-denom": "utorii",
}
```
