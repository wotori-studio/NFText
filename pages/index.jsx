import Wallet from "/src/components/wallet/main";
import styles from "/src/styles/Styles.module.css";
import { useState } from "react";
import ModeSelector from "/src/mint/ModeSelector";


export default function Index() {
  const [curMode, setCurMode] = useState("create");
  const [createMode, setCreateMode] = useState(true);
  const [exploreMode, setExploreMode] = useState(false);

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
    <div className={styles.divCenter}>
      <div className={styles.flexy}>
        {modes.map((item) => {
          // map create and explore toggle menu
          return (
            <div className={styles.divPadding}>
              <button
                className={item[1] ? "custom_btn" : "custom_btn_not_active"}
                onClick={() => handleClick(item)}
              >
                {item[0]}
              </button>
            </div>
          );
        })}
      </div>
      <Wallet />
      <ModeSelector mode={curMode} />
    </div>
  );
}
