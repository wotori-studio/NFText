import { SigningCosmWasmClient, CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export interface ISigningCosmWasmClientContext {
  walletAddress: string;
  client: CosmWasmClient | null;
  signingClient: SigningCosmWasmClient | null;
  loading: boolean;
  error: any;
  connectWallet: any;
  disconnect: Function;
}
