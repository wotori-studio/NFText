import NF3DPreview from "../NFImage/NF3DPreview";
import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import globalStyles from "../../globalStyles/styles.module.sass";
import { useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";
import styles from "./styles.module.sass";

const CW20 = process.env.NEXT_PUBLIC_CW20 || "";
const CW721 = process.env.NEXT_PUBLIC_CW721 || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";

const WrapSell = (props: any) => {
  const NFT = props.NFT;
  const { walletAddress, signingClient } = useSigningClient();
  const [price, setPrice] = useState(0);

  const handleSell = () => {
    console.log("lets sell this:", NFT);
    const msg = `{"list_price":{"address":"${CW20}","amount":"${
      price * 370370
    }"}}`;
    const encodedMsg = Buffer.from(msg).toString("base64");
    if (!signingClient) return;

    signingClient
      ?.execute(
        walletAddress,
        CW721,
        {
          send_nft: {
            contract: MARKETPLACE,
            token_id: String(NFT.id),
            msg: encodedMsg,
          },
        },
        calculateFee(600_000, "20uconst")
      )
      .then((res) => {
        console.log(res);
        alert("Success");
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log("Error: ", error);
      });
  };

  const handleChange = (event: any) => {
    setPrice(event.target.value);
  };
  return (
    <div>
      {NFT.type === "text" && <NFText NFT={NFT} />}
      {NFT.type === "img" && <NFImage NFT={NFT} />}
      {NFT.type === "3d" && <NF3DPreview NFT={NFT} />}
      <div className={styles.center}>
        <div style={{ margin: "7px" }}>
          <input onChange={(event) => handleChange(event)} style={{width:"50px"}}></input> CW20
        </div>
        <div>
          <button
            className={globalStyles.customButtonActive}
            onClick={handleSell}
          >
            sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrapSell;
