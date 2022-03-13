import { useState } from "react";

import Uploader from "../Uploader/uploader";

import Browser from "./../NFTBrowser/NFTBrowser";
import styles from "./../NFTBrowser/NFTBrowser.module.sass";

import globalStyles from "./../../globalStyles/styles.module.sass";

interface Properties {
  action: string;
}

const modes = ["text", "img", "gltf"];

export default function ModeSelector(props: Properties) {
  const { action } = props;

  const [currentMode, setCurrentMode] = useState("img");
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
