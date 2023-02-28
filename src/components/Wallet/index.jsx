import { calculateFee } from "@cosmjs/stargate";
import { useState, useEffect } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import { convertMicroDenomToDenom } from "../../services/converter";
import dappState from "../../store/dappState";

const CW20 = process.env.NEXT_PUBLIC_CW20;
const STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM;
const FAUCET = process.env.NEXT_PUBLIC_FAUCET;

export default function Wallet() {
  const { walletAddress, signingClient } = useSigningClient();
  const [trigger, setTrigger] = useState(0);
  const [nativeBalance, setNativeBalance] = useState("");
  const [wrappedBalance, setWrappedBalance] = useState("");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) return;

    signingClient
      .getBalance(walletAddress, STAKING_DENOM)
      .then((response) => {
        console.log("Native balance:", response);
        const { amount, denom } = response;
        setNativeBalance(`${convertMicroDenomToDenom(amount)}`);
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log("Error signingClient.getBalance(): ", error);
      });

    signingClient
      .queryContractSmart(CW20, {
        balance: { address: walletAddress },
      })
      .then((response) => {
        console.log("Wrapped balance:", response);
        setWrappedBalance((Number(response.balance) / 370370).toString());
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log(
          "Error signingClient.queryContractSmart() balance: ",
          error
        );
      });
  }, [signingClient, walletAddress, trigger]);

  const handleToriiToWrap = () => {
    dappState.setState("Converting Torii to CW20");
    dappState.setOn();
    console.log("Converting Torii to Wrapped token:", input1);
    signingClient
      ?.execute(
        walletAddress,
        CW20,
        { buy: {} },
        calculateFee(600_000, "0utorii"),
        undefined, //memo
        [
          {
            amount: (Number(input1) * 1000000).toString(),
            denom: "utorii",
          },
        ]
      )
      .then((response) => {
        console.log(response);
        setInput1("");
        alert("Successfully recieved wrapped token!");
        dappState.setOff();
        setTrigger(Math.random());
      })
      .catch((error) => {
        dappState.setOff();
      });
  };

  const handleWrapToTorii = () => {
    dappState.setState("Converting CW20 to Torii");
    dappState.setOn();
    console.log("Converting Wrapped token to Torii:", input2);
    signingClient
      ?.execute(
        walletAddress,
        CW20,
        {
          burn: { amount: (input2 * 370370).toString() },
        },
        calculateFee(600_000, "0utorii")
      )
      .then((response) => {
        dappState.setOff();
        console.log(response);
        setInput2("");
        alert("Successfully unwrapped token!");
        setTrigger(Math.random());
      })
      .catch(() => {
        dappState.setOff();
      });
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

          /* Panel decoration */
          #side-checkbox {
            display: none;
          }
          .side-panel {
            /* Panel size */
            width: 208px;

            /* Positioning */
            position: fixed;
            z-index: 999999;
            top: 180px;
            left: -200px;

            /* Panel Font */
            font-family: monospace;
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
            margin: 10px 1px 3px auto;
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
          #side-checkbox:not(:checked) + .side-panel .side-button-1 .side-open {
            display: none;
          }
          #side-checkbox:not(:checked) + .side-panel .side-button-1 .side-close {
            display: block;
          }
          #side-checkbox:not(:checked) + .side-panel {
            left: 8px;
          }
          #side-checkbox:not(:checked) + .go-left {
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
      <input type="checkbox" id="side-checkbox" />
      <div className="side-panel">
        <div className="side-title">Exchange</div>
        <div className="side-body">
          <p>Torii: {nativeBalance}</p>
          <p>CW20: {wrappedBalance}</p>
          <input
            type="text"
            placeholder="torii to cw20"
            className="side-input"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <input
            type="button"
            value="convert"
            onClick={handleToriiToWrap}
            className="side-button"
          />
          <input
            type="text"
            placeholder="cw20 to torii"
            className="side-input"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <input
            type="button"
            value="convert"
            onClick={handleWrapToTorii}
            className="side-button"
          />
          <br />* keep in mind:
          <br />
          1 torii = 370370 cw20
          <br />
          <br />* We convert it for better ux so you see and able to operate 1
          cw20 as 1 torii
          <br />
          <br />
          {/* <a target="_blank" href={FAUCET}>
            faucet
          </a> */}
        </div>
        {/* Panel open / close buttons */}
        <div className="side-button-1-wr">
          <label className="side-button-1" for="side-checkbox">
            <img
              className="side-b side-open"
              src="right_arrow.svg"
              alt="we don`t care about metadata here"
              onClick={() => {
                console.log("get click");
                setTrigger(Math.random());
              }}
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
