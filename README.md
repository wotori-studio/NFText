# NFText - _from text to virtual world._
<img src="https://ipfs.io/ipfs/QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6" style="width:200px" />

## Concept
This project about collaboration between writers and artists in NFT creation.
The goal to allow all people participate in art and vitual world creation. Even If you can't draw, start from text, Imagine the character and mint the description as NFT. Then someone who ggod at painting and 3D will join your Idea and at the and you'll have a visualisation of text and group NFT that able to live in web 3.0 and virtual worlds...

## Features
Current release:
- basic interface for minting different types of assets.
- upload text, Img and gltf to ipfs
- basic sliding wallet auth
- IPFS data upload
- data stractures for minting generator
  
In progress:
- draw picture directly in browser (in progress)
- mint NFT (in progress)
- mint NFT based on others NFT (in progress)
- display all artist`s NFT (in progress)

## Stack
- react
- nextjs
- check dependincies in package.json for more info

## Data Structures
### IPFS
On pressing upload file, dApp upload 2 objects to IPFS. 
1st is - the content and 2nd it the meta. Meta is the information that will be stored in the blockchain handling file url.
- meta looks like this one.
- at '"mage" key we have ipfs direct link to document (.txt, .img, .gltf)
```json
{
    "name": "Super Man",
    "description": "Flying Around......",
    "external_url": "https://wotori.com",
    "image": "https://ipfs.io/ipfs/QmTEKokkHKCpRXMZZyGp9WYVdWTfrYquZzbT2nRGHVyDSf",
    "attributes":
    [
        {
            "trait_type": "type",
            "value": "text"
        }
    ]
}
```
### Minting
pressing `mint` button generate 2 data stractures:
- 1st - for deploy smart contract 
```json
{
    "name": "The Cat",
    "symbol": "nft",
    "minter": "archway1an03m8y9jgk0ddsyuc6wjxkafl9vlq5aj68wx2"
}
```
- 2nd - mint the cw721 token
```json
{
    "token_id": "1",
    "owner": "archway1an03m8y9jgk0ddsyuc6wjxkafl9vlq5aj68wx2",
    "token_uri": "QmevKbQwEqQ5XRSkpU41cnBF7pdb4CNuqUGcrHVLbBQxji",
    "external_url": "https://wotori.com"
}
```
## Basic Interface
![image](https://user-images.githubusercontent.com/10486621/145106617-964b6460-7ce4-49ce-9b90-0f310039bb6f.png)

## Development & Requirements

To run project localy you need to have an api key for Pinata file storage.

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

## Manual deploy commands
deploy contract
```cmd
% archway deploy --args '{"name":"TheCat", "symbol":"CAT", "minter":"archway1rwaxa4c2mqtne7x6d8klngu5ynu663zw7h9y32"}'
```
mint nft
```cmd
`% archway tx --args '{"mint":{"token_id":"1", "owner":"archway1rwaxa4c2mqtne7x6d8klngu5ynu663zw7h9y32", "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", "external_url":"https://wotori.com"}}'
```
query minten nft
`% archway query contract-state smart --args '{ "nft_info":{"token_id":"1"} }'`
## Userful commands :

### setup for contract deployment without a password
- create a test wallet: `archwayd keys add testwallet --keyring-backend test`
- now we can do like this (will no any question from CLI): 
- `archwayd tx wasm store cw721.wasm --from testwallet --keyring-backend=test --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --gas-prices 0.002uconst --gas auto --gas-adjustment 1.3 -y`

### bash into archway`s docker:
`docker run -it --volume=/var/tmp/.archwayd:/root/.archway --entrypoint sh archwaynetwork/archwayd`

### Query all deployed contracts by adddres:
```cmd
archwayd query txs --events 'message.sender=archway1an03m8y9jgk0ddsyuc6wjxkafl9vlq5aj68wx2&message.action=instantiate' --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443
```

### Query for an account balance:
```
cmd
archwayd query account archway1d7ws4qklzpy8qkzuuvjc0u4gcndfkkxhze7kfy --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443
```

### Create CW optimized WASM
```cmd
docker run --rm -v $(pwd):/code --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry cosmwasm/rust-optimizer:0.12.1
```

### Copy optimized WASM to docker container:
```cmd
cp artifacts/cw721.wasm /var/tmp/.archwayd/cw721.wasm 
```

### Upload WASM to Constantine:
```cmd
docker run -it --volume=/var/tmp/.archwayd:/root/.archway archwaynetwork/archwayd tx wasm store cw721.wasm --from user_wallet --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --gas-prices 0.002uconst --gas auto --gas-adjustment 1.3
```

no console input mode with test wallet:
```cmd
archwayd tx wasm store cw721.wasm --from testwallet --keyring-backend=test --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --gas-prices 0.002uconst --gas auto --gas-adjustment 1.3 -y
```

### Deploy instance of uploaded WASM (you need your code id from the upload tx response of the previous step)
```cmd
archwayd tx wasm instantiate $CODE_ID '{"reward_address":"archway1d7ws4qklzpy8qkzuuvjc0u4gcndfkkxhze7kfy","gas_rebate_to_user":false,"instantiation_request":"eyJjb3VudCI6MH0=","collect_premium":false,"premium_percentage_charged":0}' --from docker --label "My deployment label" --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --gas-prices 0.002uconst --gas auto --gas-adjustment 1.3 -y
```


most of useful commands provided by Drew | Archway Team in Archway`s Discord chanel.