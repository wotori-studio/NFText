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

  const handleClick = (e) => {
    console.log(e);
    // setActiveText(true);
    // setActiveImg(true);
    // setActiveGlts(true);
  };

  return (
    <>
      {buttons.map((item) => {
        return (
          <button
            className={item[1] ? "custom_btn" : "custom_btn_not_active"}
            onClick={() => handleClick(item)}
          >
            {item[0]}
          </button>
        );
      })}
    </>
  );
}
