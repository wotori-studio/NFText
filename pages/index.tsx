import globalStyles from "./../src/globalStyles/styles.module.sass";
import { useState } from "react";
import ModeSelector from "./../src/components/ModeSelector/ModeSelector";
import { useSigningClient } from "./../src/context/cosmwasm";
import ModeToggle from "./../src/components/ModeToggle/ModeToggle";

const modes = [
  {
    name: "create",
    action: () => {console.log("create")}
  },
  {
    name: "explore",
    action: () => {console.log("explore")}
  }
];

export default function Main() {

  const [currentMode, setCurrentMode] = useState("create");
  const [indexActiveButton, setIndexActiveButton] = useState(0);

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


  function handleClick() {
    console.log("work");
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
    </div>
  );
}
