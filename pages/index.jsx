import globalStyles from "/src/global-styles/styles.module.css";
import { useState } from "react";
import ModeSelector from "../src/mint/ModeSelector";
import { useSigningClient } from "../src/context/cosmwasm";

export default function Index() {
  const [curMode, setCurMode] = useState("create");
  const [createMode, setCreateMode] = useState(true);
  const [exploreMode, setExploreMode] = useState(false);

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

  let modes = [
    ["create", createMode],
    ["explore", exploreMode],
  ];

  const handleClick = (item) => {
    if (item[0] === "create") {
      setCurMode("create");
      setCreateMode(true);
      setExploreMode(false);
    }
    else if (item[0] === "explore") {
      setCurMode("explore");
      setCreateMode(false);
      setExploreMode(true);
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
            {modes.map( (item, index) => {
              // map create and explore toggle menu
              return (
                  <button
                    key={index}
                    className={item[1] ? globalStyles.customButtonActive : globalStyles.customButtonNotActive}
                    onClick={() => handleClick(item)}
                  >
                    {item[0]}
                  </button>
              );
            })}
          </div>
          <ModeSelector mode={curMode} />
        </>
      }
    </div>
  );
}
