import { useEffect, useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import queryMini from "../../services/query/queryMini";
import NF3DPreview from "../NFImage/NF3DPreview";
import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import WrapSell from "../WrapTrade/WrapSell";
import styles from "./trade.module.sass";

const CW721 = process.env.NEXT_PUBLIC_CW721 || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";

const SellSection = () => {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [tokensObj, setTokensObj] = useState([]);

  useEffect(() => {
    signingClient
      .queryContractSmart(CW721, { tokens: { owner: walletAddress } })
      .then((response) => {
        let tokens = response.tokens;
        queryMini(signingClient, tokens).then((o) => setTokensObj(o));
        console.log("got tokens ids:", tokens);
      });
  }, [signingClient]);

  return (
    <div>
      <div>You own this assets and able to sell, if you wish.</div>
      <div className={styles.nftBrowser}>
        {tokensObj
          .slice(0)
          .reverse()
          .map((NFT) => (
            <>
              <WrapSell NFT={NFT} />
            </>
          ))}
      </div>
    </div>
  );
};

export default SellSection;
