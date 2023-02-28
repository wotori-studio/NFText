import { useSigningClient } from "../../context/cosmwasm";

export function LoginHeader() {
  const { walletAddress, connectWallet, signingClient, disconnect, client } =
    useSigningClient();

  function connectToWallet() {
    if (!signingClient) {
      console.log("connecting");
      connectWallet();
    } else {
      console.log("disconecting");
      disconnect();
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div className="LoginHover">
        <p
          style={{ paddingRight: "5rem" }}
          onClick={() => {
            connectToWallet();
          }}
        >
          {walletAddress ? "Logout" : "Login"}
        </p>
        <div>
          <p>
            {walletAddress &&
              walletAddress.slice(0, 7) + "..." + walletAddress.slice(-3)}
          </p>
        </div>
      </div>
    </div>
  );
}