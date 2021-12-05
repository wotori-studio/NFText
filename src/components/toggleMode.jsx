import { useState } from "react";
import ButtonState from "./button_2";

export default function ToggleMode() {
  const [activeText, setActiveText] = useState(false);
  const [activeImg, setActiveImg] = useState(false);
  const [activeGlts, setActiveGlts] = useState(false);

  let buttons = [
    ["text", activeText],
    ["img", activeImg],
    ["gltf", activeGlts],
  ];

  const handleClick = (item) => {
    if (item[0] === "gltf") {
      setActiveText(false);
      setActiveImg(false);
      setActiveGlts(true);
    }
    if (item[0] === "text") {
      setActiveText(true);
      setActiveImg(false);
      setActiveGlts(false);
    }
    if (item[0] === "img") {
      setActiveText(false);
      setActiveImg(true);
      setActiveGlts(false);
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
