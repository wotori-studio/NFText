# CW721

#### JSON encoded constructor arguments example:
```
{
    "name":"artic",
    "symbol":"nft",
    "minter":"archway1sfpyg3jnvqzf4ser62vpeqjdtvet3mfzp2v7za"
}
```
one line:
```
% archway deploy --args '{"name":"TheCat", "symbol":"CAT", "minter":"archway1vkpq5jaefj4424zvjgnuejjt3ymarv6frsey66"}'
```

#### Metadata [Standards](https://docs.opensea.io/docs/metadata-standards)
- save metadata as json to ipfs
- [metadata standarts](https://docs.opensea.io/docs/metadata-standards)
```
{
  "name": "The Cat",
  "description": "what a wonderful cat...", 
  "external_url": "https://openseacreatures.io/3", 
  "image": "ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", 
  "attributes": [ {
      "trait_type": "type", 
      "value": "img"
    } ]
}
```

## Execute
- Mint{token_id, owner, token_uri}
- TransferNft{recipient, token_id}

#### mint command:
```json
{
    "mint":{
        "token_id":"1",
        "owner":"what a wonderful cat...",
        "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6"
    }
}
```
- one line: `% archway tx --args '{"mint":{"token_id":"1", "owner":"archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", "external_url":"https://wotori.com"}}'`
- or this one line: 'archway tx --args '{"mint":{"token_id":"3", "owner": `archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", "image":"https://wotori.com", "description":"text"}}'`

#### Query:
Tokens{owner}
OwnerOf{token_id}

NftInfo(token_id)
`% archway query contract-state smart --args '{ "nft_info":{"token_id":"1"} }'`