import globalStyles from "./../src/globalStyles/styles.module.sass";
import { useState } from "react";
import ModeSelector from "./../src/components/ModeSelector/ModeSelector";
import { useSigningClient } from "./../src/context/cosmwasm";
import ModeToggle, { Mode } from "./../src/components/ModeToggle/ModeToggle";

import RetractablePanel from "./../src/components/RetractablePanel/RetractablePanel"

export default function Main() {
  const [modes, setModes] = useState<Mode[]>([
    {
      name: "create",
      action: () => {setCurrentMode("create")}
    },
    {
      name: "explore",
      action: () => {setCurrentMode("explore")}
    }
  ]);
  const [currentMode, setCurrentMode] = useState("create");

  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const [connect, setConnectState] = useState(false);
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet();
      setConnectState(true);
    } 
    else {
      disconnect();
      setConnectState(false);
    }
  };

  return (
    <div className={globalStyles.mainBlock}>
      <div className={`${globalStyles.onlineModes}`}>
        <button
          className={connect ? globalStyles.customButtonNotActive : globalStyles.customButtonActive}
          onClick={handleConnect}
        >
          {connect ? "disconnect" : "connect"}
        </button>
      </div>
      {connect &&
        <>
          <div className={globalStyles.modes}>
            <ModeToggle modes={modes} />
          </div>
          <ModeSelector action={currentMode} />
        </>
      }
      {process.env.NODE_ENV === "development" && 
        <RetractablePanel />
      }
    </div>  
  );
}
