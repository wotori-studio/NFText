import { useSigningClient } from "../context/cosmwasm";

export default function LoginWallet() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      console.log("start login", walletAddress);
      connectWallet();
    } else {
      console.log("Disconnecting", walletAddress);
      disconnect();
    }
  };

  return <button onClick={handleConnect}>LOGIN</button>;
}
