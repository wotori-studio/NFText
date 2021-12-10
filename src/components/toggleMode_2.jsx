import { useState } from "react";

export default function ToggleRootMode() {
  // not used after lifting state up
  const [createMode, setCreateMode] = useState(false);
  const [exploreMode, setExploreMode] = useState(false);

  let buttons = [
    ["create", createMode],
    ["explore", exploreMode],
  ];

  const handleClick = (item) => {
    if (item[0] === "create") {
      setCreateMode(true);
      setExploreMode(false);
    }
    if (item[0] === "explore") {
      setCreateMode(false);
      setExploreMode(true);
    }
  };

  return (
    <>
      <style jsx>
        {`
          .flexy {
            display: flex;
            justify-content: center;
          }
          .div-padding {
            padding-bottom: 25px;
          }
        `}
      </style>

      <div className="flexy">
        {buttons.map((item) => {
          return (
            <div className="div-padding">
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
