import { useState } from "react";
import { useSigningClient } from "../context/cosmwasm";

export default function LoginWallet() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const [connect, setConnectState] = useState(false);
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      console.log("start login");
      connectWallet();
      setConnectState(true);
    } else {
      console.log("Disconnecting", walletAddress);
      disconnect();
      setConnectState(false);
    }
  };

  return (
    <button
      class={connect ? "custom_btn_not_active" : "custom_btn"}
      onClick={handleConnect}
    >
      {connect ? "disconnect" : "connect"}
    </button>
  );
}
