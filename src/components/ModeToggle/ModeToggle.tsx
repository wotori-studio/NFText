import globalStyles from "./../../globalStyles/styles.module.sass";

import { useState } from "react"


interface Mode {
  name: string;
  action(): void | JSX.Element;
}

interface Properties {
  modes: Array<Mode>;
} 

function ModeToggle(props: Properties) {
  const { modes } = props;

  const [indexActiveButton, setIndexActiveButton] = useState(0);

  function toggle(index: number) {
    setIndexActiveButton(index);
    modes[index].action();
  };

  function jsxModes(): JSX.Element[] {
    return modes.map((mode, index) => {
      let buttonMode = index === indexActiveButton ? globalStyles.customButtonActive : globalStyles.customButtonNotActive;
      return (
        <button
          key={index}
          className={buttonMode}
          onClick={() => toggle(index)}
        >
          {mode.name}
        </button>
      );
    });
  }

  return (
    <>
      { jsxModes() }
    </>
  );
}


export default ModeToggle;
