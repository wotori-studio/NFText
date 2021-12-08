# Archway smart contracts sandbox

- cw20
- increment
- cw721(in progress)

- currently cw20 & cw721 copied from [cw-plus](https://github.com/CosmWasm/cw-plus) and [cw-nft](https://github.com/CosmWasm/cw-nfts)

- increment just auto generated code taken from [Archway repo](https://github.com/archway-network/archway-templates/tree/main/increment)

for better use read this:
[Anatomy of a Smart Contract](https://docs.cosmwasm.com/dev-academy/develop-smart-contract/intro/)

### Useful links
- [test-net Contantine block explorer](https://explorer.constantine-1.archway.tech/)

### Keep in mind

- when doing `% archway deploy`, CLI looks in config.json - title. This name will be used while deployng and should be the same as generated wasm files in folder `artifacts`
- `config.json` should be correct while deploying. If it is, successifuly deployed contracts will appear in config.json unde `deployments` key.
-  At this moment, sm-contracts should be with `cosmwasm-std = { version = "0.16.2" }` and not higher, like `"1.0.0"`, to be successifuly deployed on archway network.
-  keyring and all archwayd things stored here `/var/tmp/.archwayd`