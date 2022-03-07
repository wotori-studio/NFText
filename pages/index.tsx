import globalStyles from "/src/global-styles/styles.module.sass";
import { useState } from "react";
import ModeSelector from "../src/mint/ModeSelector";
import { useSigningClient } from "../src/context/cosmwasm";

interface Properties {
  action: string;
}

const modes = ["create", "explore"];

export default function Index(props: Properties) {
  const { action } = props;

  const [curMode, setCurMode] = useState("create");
  const [indexActiveButton, setIndexActiveButton] = useState(0);

  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const [connect, setConnectState] = useState(false);
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      console.log("start login");
      connectWallet();
      setConnectState(true);
    } 
    else {
      console.log("Disconnecting", walletAddress);
      disconnect();
      setConnectState(false);
    }
  };


  function handleClick (mode: string) {
    setIndexActiveButton(modes.indexOf(mode));
    setCurMode(mode);
    
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
            {modes.map( (mode, index) => {
              let buttonMode = index === indexActiveButton ? globalStyles.customButtonActive : globalStyles.customButtonNotActive;
              // map create and explore toggle menu
              return (
                  <button
                    key={index}
                    className={buttonMode}
                    onClick={() => handleClick(mode)}
                  >
                    {mode}
                  </button>
              );
            })}
          </div>
          <ModeSelector action={curMode} />
        </>
      }
    </div>
  );
}
