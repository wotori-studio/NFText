// https://docs.keplr.app/api/suggest-chain.html
import { NetworkConfig } from "react-keplr";
const DENOM_MINI = process.env.NEXT_PUBLIC_STAKING_DENOM || "";
const DENOM = DENOM_MINI?.substring(1).toUpperCase() || "";
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "";
const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME || "";
const RPC = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || "";
const REST = process.env.NEXT_PUBLIC_CHAIN_REST_ENDPOINT || "";
const BECH32 = process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX || "";
const NEXT_PUBLIC_FAUCET = process.env.NEXT_PUBLIC_FAUCET || "";

const chainInfo: NetworkConfig = {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  rpc: RPC,
  rest: REST,
  stakeCurrency: {
    coinDenom: DENOM,
    coinMinimalDenom: DENOM_MINI,
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: BECH32,
    bech32PrefixAccPub: `${BECH32}pub`,
    bech32PrefixValAddr: `${BECH32}valoper`,
    bech32PrefixValPub: `${BECH32}valoperpub`,
    bech32PrefixConsAddr: `${BECH32}valcons`,
    bech32PrefixConsPub: `${BECH32}valconspub`,
  },
  currencies: [
    {
      coinDenom: DENOM,
      coinMinimalDenom: DENOM_MINI,
      coinDecimals: 6,
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
  ],
  feeCurrencies: [
    {
      coinDenom: DENOM,
      coinMinimalDenom: DENOM_MINI,
      coinDecimals: 6,
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 0,
    average: 0.1,
    high: 0.2,
  },
  faucets: [NEXT_PUBLIC_FAUCET],
  features: ["cosmwasm"],
};

export default chainInfo;
