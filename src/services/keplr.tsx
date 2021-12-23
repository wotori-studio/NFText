// https://docs.keplr.app/api/suggest-chain.html

export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase();
}

interface CosmosKeplrWindow extends Window {
  keplr: any;
  getOfflineSigner: Function;
}

declare let window: CosmosKeplrWindow;

export const connectKeplr = async () => {
  if (!window.getOfflineSigner || !window.keplr) {
    alert("Please install keplr extension");
  } else {
    if (window.keplr.experimentalSuggestChain) {
      const stakingDenom = convertFromMicroDenom(
        process.env.NEXT_PUBLIC_STAKING_DENOM || "ucons"
      );

      try {
        const bech32 = process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX;
        await window.keplr.experimentalSuggestChain({
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
          chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
          rpc: process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT,
          rest: process.env.NEXT_PUBLIC_CHAIN_REST_ENDPOINT,
          stakeCurrency: {
            coinDenom: stakingDenom,
            coinMinimalDenom: process.env.NEXT_PUBLIC_STAKING_DENOM,
            coinDecimals: 6,
          },
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: bech32,
            bech32PrefixAccPub: `${bech32}pub`,
            bech32PrefixValAddr: `${bech32}valoper`,
            bech32PrefixValPub: `${bech32}valoperpub`,
            bech32PrefixConsAddr: `${bech32}valcons`,
            bech32PrefixConsPub: `${bech32}valconspub`,
          },
          currencies: [
            {
              coinDenom: stakingDenom,
              coinMinimalDenom: process.env.NEXT_PUBLIC_STAKING_DENOM,
              coinDecimals: 6,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: stakingDenom,
              coinMinimalDenom: process.env.NEXT_PUBLIC_STAKING_DENOM,
              coinDecimals: 6,
            },
          ],
          coinType: 118,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
        });
      } catch {
        alert("Failed to suggest the chain");
      }
    } else {
      alert("Please use the recent version of keplr extension");
    }
  }
};
