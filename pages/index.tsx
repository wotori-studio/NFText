// Styles
import globalStyles from "./../src/globalStyles/styles.module.sass";

// Dependencies
import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import ModeSelector from "./../src/components/ModeSelector/ModeSelector";
import ModeToggle, { Mode } from "./../src/components/ModeToggle/ModeToggle";
import RawFooter from "../src/components/footer";

// Contexts
import { useSigningClient } from "./../src/context/cosmwasm";

// Stores
import devStore from "../src/store/devStore";
import nftStore from "./../src/store/nftStore";
import Wallet from "../src/components/Wallet";
import { isMobile } from "react-device-detect";

const Main = observer(() => {
  let mod = [];
  mod = [
    {
      name: "create",
      action: () => {
        nftStore.setOperatingMode("create");
      },
    },
    {
      name: "explore",
      action: () => {
        nftStore.setOperatingMode("explore");
      },
    },
    {
      name: "trade",
      action: () => {
        nftStore.setOperatingMode("trade");
      },
    },
  ];
  const [modes, setModes] = useState<Mode[]>(mod);
  const { walletAddress, connectWallet, disconnect, client } = useSigningClient();
  const [connect, setConnect] = useState(false);

  function connectToWallet() {
    if (!client) {
      console.log("connecting");
      connectWallet();
      setConnect(true);
    } else {
      console.log("disconecting");
      disconnect();
      setConnect(false);
    }
  }

  return (
    <div className={globalStyles.app}>
      <div className={globalStyles.mainBlock}>
        <div className={`${globalStyles.onlineModes}`}>
          <button
            className={
              connect
                ? globalStyles.customButtonNotActive
                : globalStyles.customButtonActive
            }
            onClick={() => connectToWallet()}
          >
            {connect ? "disconnect" : "connect"}
          </button>
        </div>
        {connect && (
          <>
            {!isMobile ? <Wallet /> : null}
            <div className={globalStyles.modes}>
              <ModeToggle modes={modes} />
            </div>
            <ModeSelector />
            <RawFooter />
          </>
        )}
      </div>
    </div>
  );
});

export default Main;
