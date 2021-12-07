# NFText - _from text to virtual world._
<img src="https://ipfs.io/ipfs/QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6" style="width:200px" />

## Concept
This project about collaboration between writers and artists in NFT creation.
The goal to allow all people participate in art and vitual world creation. Even If you can't draw, start from text, Imagine the character and mint the description as NFT. Then someone who ggod at painting and 3D will join your Idea and at the and you'll have a visualisation of text and group NFT that able to live in web 3.0 and virtual worlds...
More info at [wotori.com](https://wotori.com)

## Features
- upload Img to ipfs (img, painting and 3d in progress)
- basic wallet auth (in progress. move from .env to interface)
- mint NFT (in progress)
- mint NFT based on others NFT (in progress)
- display all artist`s NFT (in progress)
- share NFT with others (in progress)
- trade NFTs (in progress)

## Basic Interface
![image](https://user-images.githubusercontent.com/10486621/145106617-964b6460-7ce4-49ce-9b90-0f310039bb6f.png)

## Development & Requirements

#### Install Archway core
- Install `archwayd` and `cli` following tutorial at archway [documentation](https://docs.archway.io/docs/create/getting-started/install)

#### Install the dependencies and start the server.

```sh
% yarn install
% yarn dev
```
nextjs project will handle server size for contracts deployments and archway usage.

#### congifure .env file
- copy-paste `env.template` && rename It to `.env`
- fill .env constnts with real values
- you should have pinata API keys to run the current version of softwarenft
