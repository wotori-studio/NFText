import { useState } from "react";

export default function ToggleMode() {
  const [textMode, setTextMode] = useState(false);
  const [imgMode, setImgMode] = useState(false);
  const [gltfMode, setGltfMode] = useState(false);

  let buttons = [
    ["text", textMode],
    ["img", imgMode],
    ["gltf", gltfMode],
  ];

  const handleClick = (item) => {
    if (item[0] === "gltf") {
      setTextMode(false);
      setImgMode(false);
      setGltfMode(true);
    }
    if (item[0] === "text") {
      setTextMode(true);
      setImgMode(false);
      setGltfMode(false);
    }
    if (item[0] === "img") {
      setTextMode(false);
      setImgMode(true);
      setGltfMode(false);
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
        `}
      </style>

      <div className="flexy">
        {buttons.map((item) => {
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
    </>
  );
}
