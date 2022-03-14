import { useState } from "react";

import NFUploader from "./../NFUploader/NFUploader";
import NFBrowser from "./../NFBrowser/NFBrowser";
import ModeToggle, { Mode } from "./../ModeToggle/ModeToggle";

import styles from "./ModeSelector.module.sass";

interface Properties {
  action: string;
}

export default function ModeSelector(props: Properties) {
  const { action } = props;

  const [modes, setModes] = useState<Mode[]>([
    {
      name: "text",
      action: () => {setCurrentMode("text")}
    },
    {
      name: "img",
      action: () => {setCurrentMode("img")}
    },
    {
      name: "gltf",
      action: () => {setCurrentMode("gltf")}
    }
  ]);
  const [currentMode, setCurrentMode] = useState("img");

  return (
    <>
      <div className={styles.overview}>
        <ModeToggle modes={modes} />
      </div>

      {action === "create" 
        ? <NFUploader mode={currentMode} /> 
        : <NFBrowser mode={currentMode} />
      }
    </>
  );
}
