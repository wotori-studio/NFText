export default function ButtonState(props) {
  console.log(props.active)
  return (
    <button
      className={props.active ? "custom_btn" : "custom_btn_not_active"}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
