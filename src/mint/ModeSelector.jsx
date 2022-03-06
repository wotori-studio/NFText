import { useState } from "react";
import Uploader from "../components/uploader/uploader";
import Browser from "./NftBrowser";

import styles from "./NftBrowser.module.css";
import globalStyles from "./../global-styles/styles.module.css";

export default function ModeSelector(props) {
  /* TODO: import style as modules https://nextjs.org/blog/styling-next-with-styled-jsx */

  const [curMode, setCurMode] = useState("text");
  const [textMode, setTextMode] = useState(true);
  const [paintMode, setPaintMode] = useState(false);
  const [imgMode, setImgMode] = useState(false);
  const [gltfMode, setGltfMode] = useState(false);

  let modes = [
    ["text", textMode],
    ["img", imgMode],
    ["gltf", gltfMode],
  ];

  const handleClick = (item) => {
    setCurMode(item[0]);

    if (item[0] === "gltf") {
      setTextMode(false);
      setImgMode(false);
      setGltfMode(true);
      setPaintMode(false);
    }
    else if (item[0] === "text") {
      setTextMode(true);
      setImgMode(false);
      setGltfMode(false);
      setPaintMode(false);
    }
    else if (item[0] === "img") {
      setTextMode(false);
      setImgMode(true);
      setGltfMode(false);
      setPaintMode(false);
    }
    else if (item[0] === "paint") {
      setTextMode(false);
      setImgMode(false);
      setGltfMode(false);
      setPaintMode(true);
    }
  };

  return (
    <>
      {/* text | img | gltf switches */}
      <div className={styles.overview}>
        {modes.map( (item, index) => {
          return (
            <button
              key={index}
              className={item[1] ? globalStyles.customButtonActive : globalStyles.customButtonNotActive}
              onClick={() => handleClick(item)}
            >
              {item[0]}
            </button>
          );
        })}
      </div>

      {props.mode === "create" ? (
        <div className="uploader">
          <Uploader mode={curMode} />
        </div>
      ) : (
        <Browser mode={curMode} />
      )}
    </>
  );
}
