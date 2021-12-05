import { useState } from "react";

export default function ButtonState(props) {
  let [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) {
      setActive(false);
    }
    if (!active) {
      setActive(true);
    }
  };

  return (
    <button
      className={active ? "custom_btn" : "custom_btn_not_active"}
      onClick={handleClick}
    >
      {props.text}
    </button>
  );
}
