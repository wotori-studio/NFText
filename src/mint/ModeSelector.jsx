import { useState } from "react";
import Uploader from "/src/components/uploader/uploader";
import Browser from "./NftBrowser";

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
    if (item[0] === "text") {
      setTextMode(true);
      setImgMode(false);
      setGltfMode(false);
      setPaintMode(false);
    }
    if (item[0] === "img") {
      setTextMode(false);
      setImgMode(true);
      setGltfMode(false);
      setPaintMode(false);
    }
    if (item[0] === "paint") {
      setTextMode(false);
      setImgMode(false);
      setGltfMode(false);
      setPaintMode(true);
    }
  };

  return (
    <>
      <style jsx>
        {`
          .flexy {
            display: flex;
            justify-content: space-between;
          }
          .div-menu {
            padding-bottom: 50px;
          }
        `}
      </style>
      <div>
        <div className="div-menu">
          <div className="flexy">
            {modes.map((item) => {
              return (
                <div>
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
        </div>
        {props.mode === "create" ? (
          <div className="uploader">
            <Uploader mode={curMode} />
          </div>
        ) : (
          <Browser mode={curMode}/>
        )}
        {/* based on Cosmos Archway project.  TODO: Add to bottom */}
      </div>
    </>
  );
}
