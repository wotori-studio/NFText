import EditingMode from "./EditingMode";
import Wallet from "../../src/components/wallet/main";
import ToggleRootMode from "../../src/components/toggleMode_2";
import styles from "./Styles.module.css";
import { useEffect, useState } from "react";
import ExploreMode from "./ExploreMode";

export default function Index() {
  const [createMode, setCreateMode] = useState(false);
  const [exploreMode, setExploreMode] = useState(false);

  let modes = [
    ["create", createMode],
    ["explore", exploreMode],
  ];

  const handleClick = (item) => {
    if (item[0] === "create") {
      setCreateMode(true);
      setExploreMode(false);
    }
    if (item[0] === "explore") {
      setCreateMode(false);
      setExploreMode(true);
    }
  };

  return (
    <div className={styles.divCenter}>
      <div className={styles.flexy}>
        {modes.map((item) => {
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
      {createMode ? <EditingMode /> : null}
      {exploreMode ? <ExploreMode /> : null}
    </div>
  );
}
