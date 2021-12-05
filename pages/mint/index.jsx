import Uploader from "/src/components/uploader";
import { useState } from "react";

const index = () => {
  /* TODO: import style as modules https://nextjs.org/blog/styling-next-with-styled-jsx */

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
          .div-main {
            padding-top: 100px;
            padding-left: 550px;
            padding-right: 550px;
          }
          .div-menu {
            padding-bottom: 50px;
          }
          .uploader-img {
            display: ${imgMode ? true : "none"};
          }
          .uploader-paint {
            display: ${paintMode ? true : "none"};
          }
          .uploader-text {
            display: ${textMode ? true : "none"};
          }
          .uploader-gltf {
            display: ${gltfMode ? true : "none"};
          }
        `}
      </style>
      <div className="div-main">
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
        <div className="uploader-img">
          <Uploader mode="img" />
        </div>
        <div className="uploader-text">text</div>
        <div className="uploader-paint">paint</div>
        <div className="uploader-gltf">3d</div>
        {/* based on Cosmos Archway project. */}
      </div>
    </>
  );
};

export default index;
