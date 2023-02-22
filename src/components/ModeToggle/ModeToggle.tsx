import globalStyles from "./../../globalStyles/styles.module.sass";
import { useState, useEffect } from "react";

export interface Mode {
  name: string;
  action: () => void;
}

interface Properties {
  modes: Array<Mode>;
}

const ModeToggle = ({ modes }: Properties): JSX.Element => {

  const [indexActiveButton, setIndexActiveButton] = useState(1);
  useEffect(() => {
    modes[indexActiveButton].action();
  }, []);

  return <>
    {modes.map((mode, index) => {
      let buttonMode =
        index === indexActiveButton
          ? globalStyles.customButtonActive
          : globalStyles.customButtonNotActive;
      return (
        <button
          key={index}
          className={buttonMode}
          onClick={() => {
            setIndexActiveButton(index)
            mode.action()
          }}
        >
          {mode.name}
        </button>
      );
    })}
  </>
};

export default ModeToggle;
