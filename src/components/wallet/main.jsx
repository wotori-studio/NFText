import { useState, useEffect } from "react";

export default function Wallet() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [inputClass, setInputClass] = useState("side-input");
  const [btnValue, setBtnValue] = useState("Login");

  useEffect(() => {
    localStorage.setItem("key#1", input1);
    localStorage.setItem("key#2", input2);
    localStorage.setItem("key#3", input3);
  }, []);

  const changes = (event) => {
      listDir()
    if (btnValue === "Login" && input1 && input2) {
      localStorage.setItem("key#1", input1);
      localStorage.setItem("key#2", input2);
      localStorage.setItem("key#3", input3);

      setInputClass(`${inputClass} hidden`);

      let checkbox = document.getElementById("side-checkbox");
      checkbox.checked = true;

      event.target.style = "background-color: #2400ff";

      return setBtnValue("Logout");
    } else if (btnValue === "Logout") {
      localStorage.clear();

      setInputClass("side-input");

      event.target.style = "background-color: #00ffc2";

      setInput1("");
      setInput2("");
      setInput3("");
      return setBtnValue("Login");
    } else {
      return setBtnValue("Login");
    }
  };

  return (
    <>
      <style jsx>
        {`
          /* Disable indentation by default */
          /* TODO: transfer style to separate file and refactor */
          * {
            padding: 0px;
            margin: 0px;
            border: 0px;
            outline: none;
            user-select: none;
          }

          /* anel decoration */
          #side-checkbox {
            display: none;
          }
          .side-panel {
            /* Panel size */
            width: 208px;

            /* Positioning */
            position: fixed;
            z-index: 999999;
            top: 60px;
            left: -200px;

            /* Panel Font */
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;

            /* Smooth transitions */
            transition: all 0.5s;
          }
          .side-title {
            /* Invisible background size */
            width: 208px;
            height: 40px;

            /* Colors */
            background-color: rgba(0, 0, 0, 0);

            /* Font */
            text-align: center;
            font-weight: 900;
            font-size: 31px;
            line-height: 36px;
          }

          .side-body {
            // width: 166px;

            padding: 23px 21px;

            background: #00d1ff;
            color: #fff;
          }

          .side-input {
            width: 100%;
            height: 32px;

            text-align: center;
            font-size: 20px;
            line-height: 23px;

            display: block;
            margin: 0px auto 10px auto;
          }

          .side-input::placeholder {
            color: rgba(0, 0, 0, 0.17);
          }

          .side-button {
            width: 100%;
            height: 36px;

            color: #fff;
            background-color: #00ffc2;

            font-size: 20px;
            line-height: 23px;

            display: block;
            margin: 0px auto;
            border: 0px;
          }

          /* Button */
          .side-button-1-wr {
            width: 17px;
            position: absolute;
            top: 55%;
            right: -25px;
            text-align: center; /* Container for the button to make it easier to place */
          }
          .side-button-1 {
            display: inline-block;
          }
          .side-button-1 .side-b {
            position: relative;
            cursor: pointer;
          }
          .side-button-1 .side-b:hover,
          .side-button-1 .side-b:active,
          .side-button-1 .side-b:focus {
            color: #fff;
          }
          .side-button-1 .side-b:after,
          .side-button-1 .side-b:before {
            position: absolute;
            height: 4px;
            left: 50%;
            bottom: -6px;
            content: "";
            transition: all 280ms ease-in-out;
            width: 0;
          }
          .side-button-1 .side-b:before {
            top: -6px;
          }
          .side-button-1 .side-b:hover:after,
          .side-button-1 .side-b:hover:before {
            width: 100%;
            left: 0;
          }
          /* Button switches */
          .side-button-1 .side-close {
            display: none;
          }
          #side-checkbox:checked + .side-panel .side-button-1 .side-open {
            display: none;
          }
          #side-checkbox:checked + .side-panel .side-button-1 .side-close {
            display: block;
          }
          #side-checkbox:checked + .side-panel {
            left: 8px;
          }
          #side-checkbox:checked + .go-left {
            left: -200px;
          }

          .rotate {
            transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
          }

          .hidden {
            display: none;
          }
        `}
      </style>
      <input type="checkbox" id="side-checkbox" /> {/* hidden */}
      <div className="side-panel">
        {" "}
        <div className="side-title">Wallet</div>
        <div className="side-body">
          <input
            type="password"
            placeholder="account addres"
            className={inputClass}
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <input
            type="password"
            placeholder="mnemonic"
            className={inputClass}
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="input text"
            className={inputClass}
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          /> */}

          <input
            type="button"
            value={btnValue}
            onClick={changes}
            className="side-button"
          />
        </div>
        {/* Panel open / close buttons */}
        <div className="side-button-1-wr">
          <label className="side-button-1" for="side-checkbox">
            <img
              className="side-b side-open"
              src="right_arrow.svg"
              alt="we don`t care about metadata here"
            />
            <img
              className="side-b side-close rotate"
              src="/right_arrow.svg"
              alt="we don`t care about metadata here"
            />
          </label>
        </div>
      </div>
    </>
  );
}
