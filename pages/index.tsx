import globalStyles from "./../src/globalStyles/styles.module.sass";
import { useState } from "react";
import ModeSelector from "./../src/components/ModeSelector/ModeSelector";
import { useSigningClient } from "./../src/context/cosmwasm";

const modes = ["create", "explore"];

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


  function handleClick (mode: string) {
    setIndexActiveButton(modes.indexOf(mode));
    setCurrentMode(mode);
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
          <ModeSelector action={currentMode} />
        </>
      }
    </div>
  );
}
