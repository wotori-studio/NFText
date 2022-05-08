// https://docs.keplr.app/api/suggest-chain.html
import ToriiInfo from "../../chain.info";
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
    alert(
      "Please install keplr extension. Without It you will be unable to mint tokens"
    );
  } else {
    try {
      console.log("network settings:", ToriiInfo);
      await window.keplr.experimentalSuggestChain(ToriiInfo);
    } catch {
      alert("Failed to suggest the chain");
    }
  }
};
