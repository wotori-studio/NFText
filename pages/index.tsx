// Styles
import globalStyles from "./../src/globalStyles/styles.module.sass";

// Dependencies
import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import ModeSelector from "./../src/components/ModeSelector/ModeSelector";
import ModeToggle, { Mode } from "./../src/components/ModeToggle/ModeToggle";
import DeveloperMenu from "./../src/components/DeveloperMenu/DeveloperMenu";

// Contexts
import { useSigningClient } from "./../src/context/cosmwasm";

// Stores
import devStore from "../src/store/devStore";
import nftStore from "./../src/store/nftStore";

const Main = observer(() => {
  let mod = []
    mod = [
      {
        name: "create",
        action: () => {nftStore.setOperatingMode("create")}
      },
      {
        name: "explore",
        action: () => {nftStore.setOperatingMode("explore")}
      },
      {
        name: "trade",
        action: () => {nftStore.setOperatingMode("trade")}
      }
    ]
  const [modes, setModes] = useState<Mode[]>(mod);
  
  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const [connect, setConnect] = useState(false);

  function connectToWallet() {
    const isProduction = process.env.NODE_ENV === "production";
    const isDevelopment = process.env.NODE_ENV === "development";
    const isBlockchain = devStore.dataPlatform === "Blockchain";
    const isDatabase = devStore.dataPlatform === "Database";
    if (isProduction || isBlockchain) {
      if (!walletAddress.length) {
        connectWallet();
        setConnect(true);
      }
      else {
        disconnect();
        setConnect(false);
      }
    } 
    else if (isDevelopment && isDatabase) {
      setConnect(true);
    }
    else {
      setConnect(false);
      throw new Error("Error while connecting to wallet.");
    }
  };

  return (
    <div className={globalStyles.mainBlock}>
      <div className={`${globalStyles.onlineModes}`}>
        <button
          className={connect ? globalStyles.customButtonNotActive : globalStyles.customButtonActive}
          onClick={() => connectToWallet()}
        >
          {connect ? "disconnect" : "connect"}
        </button>
      </div>
      {connect &&
        <>
          <div className={globalStyles.modes}>
            <ModeToggle modes={modes} />
          </div>
          <ModeSelector />
        </>
      }
      {process.env.NODE_ENV === "development" && 
        <DeveloperMenu />
      }
    </div>  
  );
});

export default Main;
