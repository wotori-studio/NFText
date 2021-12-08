# Archway Increment smart-contracts

JSON encoded constructor arguments example:
```json
{
    "name": "ARCHWAY FUN COIN",
    "symbol": "ARF",
    "decimals": 6,
    "initial_balances":
    [
        {
            "address": "archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld",
            "amount": "1000000"
        }
    ],
    "mint":
    {
        "minter": "archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld",
        "cap": "99900000000"
    }
}
```
the same in one line:
```json
{ "name": "ARCHWAY FUN COIN", "symbol": "ARF", "decimals": 6, "initial_balances": [ { "address": "archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "amount": "1000000" } ], "mint": { "minter": "archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "cap": "99900000000" } }
```

### Execute
archway tx --args '{"upload_logo":{"url":"https://i.ibb.co/CBrDgrf/noun-Book-4419630.png"}}'

### Query
```bash
archway query contract-state smart --args '{"token_info":{}}'
archway query contract-state smart --args '{"minter":{}}'
```