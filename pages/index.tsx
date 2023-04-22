// Styles
import globalStyles from "./../src/globalStyles/styles.module.sass";
import TestContract from "../src/components/devTests/testContract/test";
// Dependencies
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import ModeSelector from "../src/components/ModeSelector/ModeSelector";
import ModeToggle, { Mode } from "../src/components/ModeToggle/ModeToggle";
import RawFooter from "../src/components/footer";

// Contexts
import { useSigningClient } from "../src/context/cosmwasm";

// Stores
import nftStore from "../src/store/nftStore";
import Wallet from "../src/components/Wallet";
import { isMobile } from "react-device-detect";

import { LoginHeader } from "../src/components/LoginHeader";

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
  const { walletAddress, connectWallet, disconnect, client } =
    useSigningClient();
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <LoginHeader />
      <TestContract />
      {/* <div className={globalStyles.app}>
        <div className={globalStyles.mainBlock}>
          <h1>NFText</h1> beta test
          <div className={`${globalStyles.onlineModes}`}></div>
          {!isMobile && walletAddress && <Wallet />}
          <div className={globalStyles.modes}>
            <ModeToggle modes={modes} />
          </div>
          <ModeSelector />
        </div>
      </div> */}
      <RawFooter />
    </>
  );
});

export default Main;
