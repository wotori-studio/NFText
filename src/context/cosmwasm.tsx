import { createContext, useContext, ReactNode } from "react";

import { useSigningCosmWasmClient } from "./../hooks/cosmwasm";
import { ISigningCosmWasmClientContext } from "./../models/ISigningCosmWasmClientContext";

let CosmWasmContext: any;
let { Provider } = (CosmWasmContext =
  createContext<ISigningCosmWasmClientContext>({
    walletAddress: "",
    client: null,
    signingClient: null,
    loading: false,
    error: null,
    connectWallet: () => {},
    disconnect: () => {},
  }));

export const useSigningClient = (): ISigningCosmWasmClientContext =>
  useContext(CosmWasmContext);

export const SigningCosmWasmProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSigningCosmWasmClient();
  return <Provider value={value}>{children}</Provider>;
};
