// Styles
import styles from "./ModeSelector.module.sass";

// Dependencies
import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import NFUploader from "./../NFUploader/NFUploader";
import NFBrowser from "./../NFBrowser/NFBrowser";
import ModeToggle, { Mode } from "./../ModeToggle/ModeToggle";
import TradeWindow from "../TradeWindow";

// Stores
import nftStore from "./../../store/nftStore";

const ModeSelector = observer(() => {
  const [modes, setModes] = useState<Mode[]>([
    {
      name: "text",
      action: () => {
        nftStore.setNftType("text");
      },
    },
    {
      name: "img",
      action: () => {
        nftStore.setNftType("img");
      },
    },
    {
      name: "3d",
      action: () => {
        nftStore.setNftType("3d");
      },
    },
  ]);

  const [modesTrading, setModesTrading] = useState<Mode[]>([
    {
      name: "buy",
      action: () => {
        nftStore.setTypeTrade("buy");
      },
    },
    {
      name: "sell",
      action: () => {
        nftStore.setTypeTrade("sell");
      },
    }
  ]);

  return (
    <>
      <div className={styles.overview}>
        {nftStore.operatingMode !== "trade" ? (
          <ModeToggle modes={modes} />
        ) : (
          <ModeToggle modes={modesTrading} />
        )}
      </div>

      {/* TODO: replace with switchcase if it exists in js */}
      {nftStore.operatingMode === "create" ? (
        <NFUploader modalMode={null} parentId={null} />
      ) : nftStore.operatingMode === "explore" ? (
        <NFBrowser />
      ) : (
        <TradeWindow />
      )}
    </>
  );
});

export default ModeSelector;
