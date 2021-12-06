import Uploader from "/src/components/uploader/uploader";
import { useState } from "react";
import Wallet from "../../src/components/wallet/main";
import ToggleRootMode from "../../src/components/toggleMode_2";

const index = () => {
  /* TODO: import style as modules https://nextjs.org/blog/styling-next-with-styled-jsx */

  const [curMode, setCurMode] = useState("");

  const [textMode, setTextMode] = useState(false);
  const [paintMode, setPaintMode] = useState(false);
  const [imgMode, setImgMode] = useState(false);
  const [gltfMode, setGltfMode] = useState(false);

  let modes = [
    ["text", textMode],
    ["paint", paintMode],
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
      <Wallet />
      <style jsx>
        {`
          .flexy {
            display: flex;
            justify-content: space-between;
          }
          .div-main {
            padding-top: 100px;
            padding-left: 550px;
            padding-right: 550px;
          }
          .div-menu {
            padding-bottom: 50px;
          }
        `}
      </style>
      <div className="div-main">
        <div className="div-menu">
          <ToggleRootMode />
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
        <div className="uploader">
          <Uploader mode={curMode} />
        </div>
        {/* based on Cosmos Archway project. */}
      </div>
    </>
  );
};

export default index;
