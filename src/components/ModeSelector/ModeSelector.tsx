// Styles
import styles from "./ModeSelector.module.sass";

// Dependencies
import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import NFUploader from "./../NFUploader/NFUploader";
import NFBrowser from "./../NFBrowser/NFBrowser";
import ModeToggle, { Mode } from "./../ModeToggle/ModeToggle";

// Stores
import nftStore from "./../../store/nftStore";

const ModeSelector = observer(() => {
  const [modes, setModes] = useState<Mode[]>([
    {
      name: "text",
      action: () => {nftStore.setNftType("text")}
    },
    {
      name: "img",
      action: () => {nftStore.setNftType("img")}
    },
    {
      name: "3d",
      action: () => {nftStore.setNftType("3d")}
    }
  ]);

  return (
    <>
      <div className={styles.overview}>
        <ModeToggle modes={modes} />
      </div>

      {nftStore.operatingMode === "create" 
        ? <NFUploader modalMode={null} parentId={null} /> 
        : <NFBrowser />
      }
    </>
  );
});

export default ModeSelector;
