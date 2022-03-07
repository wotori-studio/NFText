import { useState } from "react";

import Uploader from "./../components/uploader/uploader";
import Browser from "./NftBrowser";

import styles from "./NftBrowser.module.sass";
import globalStyles from "./../global-styles/styles.module.sass";

interface Properties {
  action: string;
}

const modes = ["text", "img", "gltf"];

export default function ModeSelector(props: Properties) {
  const { action } = props;

  const [currentMode, setCurrentMode] = useState("text");
  const [indexActiveButton, setIndexActiveButton] = useState(0);

  function handleClick(mode: string) {
    setIndexActiveButton(modes.indexOf(mode));
    setCurrentMode(mode);
  };

  return (
    <>
      {/* text | img | gltf switches */}
      <div className={styles.overview}>
        {modes.map((mode, index) => {
          let buttonMode = index === indexActiveButton ? globalStyles.customButtonActive : globalStyles.customButtonNotActive;

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

      {action === "create" ? <Uploader mode={currentMode} /> : <Browser mode={currentMode} />}
    </>
  );
}
