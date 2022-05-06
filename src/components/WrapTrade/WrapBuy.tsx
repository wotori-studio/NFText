import NF3DPreview from "../NFImage/NF3DPreview";
import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import globalStyles from "../../globalStyles/styles.module.sass";
import { useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

const CW20 = process.env.NEXT_PUBLIC_CW20 || "";
const CW721 = process.env.NEXT_PUBLIC_CW721 || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";

const WrapBuy = (props: any) => {
  const NFT = props.NFT;
  const PRICE = props.price;
  const { walletAddress, signingClient } = useSigningClient();
  const [price, setPrice] = useState(0);

  const handleBuy = () => {
    console.log("lets buy this:", NFT);
    const msg = `{"offering_id":"${NFT.id}"}`;
    const encodedMsg = Buffer.from(msg).toString("base64");

    if (!signingClient) return;

    signingClient
      ?.execute(
        walletAddress,
        CW20,
        {
          send: {
            contract: MARKETPLACE,
            amount: PRICE,
            msg: encodedMsg,
          },
        }, // msg
        calculateFee(600_000, "20uconst")
      )
      .then((res) => {
        console.log(res);
        alert("Successfully ordered!");
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log("Error signingClient?.execute(): ", error);
      });
  };

  return (
    <div>
      {NFT.type === "text" && <NFText NFT={NFT} />}
      {NFT.type === "img" && <NFImage NFT={NFT} />}
      {NFT.type === "3d" && <NF3DPreview NFT={NFT} />}
      <div>price:{PRICE}</div>
      <div>
        <button className={globalStyles.customButtonActive} onClick={handleBuy}>
          buy
        </button>
        <button className={globalStyles.customButtonActive} onClick={handleBuy}>
          withdraw if owner
        </button>
      </div>
    </div>
  );
};

export default WrapBuy;
