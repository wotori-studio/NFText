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
      action: () => {nftStore.setNFTType("text")}
    },
    {
      name: "img",
      action: () => {nftStore.setNFTType("img")}
    },
    {
      name: "gltf",
      action: () => {nftStore.setNFTType("gltf")}
    }
  ]);

  return (
    <>
      <div className={styles.overview}>
        <ModeToggle modes={modes} />
      </div>

      {nftStore.operatingMode === "create" 
        ? <NFUploader /> 
        : <NFBrowser />
      }
    </>
  );
});

export default ModeSelector;
