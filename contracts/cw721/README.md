# CW721

#### JSON encoded constructor arguments example:
```
{
    "name":"artic",
    "symbol":"art",
    "minter":"archway1sfpyg3jnvqzf4ser62vpeqjdtvet3mfzp2v7za"
}
```
one line:
```
% archway deploy --args '{"name":"TheCat", "symbol":"CAT", "minter":"archway1sfpyg3jnvqzf4ser62vpeqjdtvet3mfzp2v7za"}'
```

#### Metadata [Standards](https://docs.opensea.io/docs/metadata-standards)
- save metadata as json to ipfs
```
{
    "name":"TheCat",
    "description":"what a wonderful cat...",
    "image":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6",
    "external_url":"https://wotori.com"
}
```

#### Execute
```
Mint{token_id, owner, token_uri}
TransferNft{recipient, token_id}

##### mint command
```
{
    "mint":{
        "token_id":"1",
        "owner":"what a wonderful cat...",
        "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6",
    }
}

% archway tx --args '{"mint":{"token_id":"1", "owner":"archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", "external_url":"https://wotori.com"}}'

#### Query:
Tokens{owner}
OwnerOf{token_id}

NftInfo(token_id)
`% archway query contract-state smart --args '{ "nft_info":{"token_id":"0"} }'`