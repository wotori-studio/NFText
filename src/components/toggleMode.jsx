import ButtonState from "./button_2";

export default function ToggleMode() {
  const handleClick = (e) => {
    console.log(e);
    buttons = [
        ["text", false],
        ["img", false],
        ["gltf", false],
      ];
  };
  let buttons = [
    ["text", true],
    ["img", false],
    ["gltf", false],
  ];
  return (
    <>
      {buttons.map((item) => {
        return (
          <ButtonState onClick={handleClick} text={item[0]} active={item[1]} />
        );
      })}
    </>
  );
}
