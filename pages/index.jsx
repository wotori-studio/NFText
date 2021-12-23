import Wallet from "/src/components/wallet/main";
import styles from "/src/styles/Styles.module.css";
import { useState } from "react";
import ModeSelector from "/src/mint/ModeSelector";
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
    } else {
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
    if (item[0] === "explore") {
      setCurMode("explore");
      setCreateMode(false);
      setExploreMode(true);
    }
  };

  return (
    <>
      <div className={styles.divCenter}>
        <div className={`${styles.flexy} ${styles.divPadding}`}>
          <button
            class={connect ? "custom_btn_not_active" : "custom_btn"}
            onClick={handleConnect}
          >
            {connect ? "disconnect" : "connect"}
          </button>
        </div>
        {connect ? (
          <div>
            <div className={styles.flexy}>
              {modes.map((item) => {
                // map create and explore toggle menu
                return (
                  <div className={styles.divPadding}>
                    <button
                      className={
                        item[1] ? "custom_btn" : "custom_btn_not_active"
                      }
                      onClick={() => handleClick(item)}
                    >
                      {item[0]}
                    </button>
                  </div>
                );
              })}
            </div>
            <ModeSelector mode={curMode} />
          </div>
        ) : null}
      </div>
    </>
  );
}
