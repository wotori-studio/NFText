import { useEffect, useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import queryMini from "../../services/query/queryMini";
import WrapSell from "../WrapTrade/WrapSell";
import styles from "./trade.module.sass";
import { isMobile } from "react-device-detect";

const CW721 = process.env.NEXT_PUBLIC_CW721 || "";

const SellSection = () => {
  const { walletAddress, client } = useSigningClient();
  const [tokensObj, setTokensObj] = useState([]);

  useEffect(() => {
    if (!isMobile) {
      client
        .queryContractSmart(CW721, { tokens: { owner: walletAddress } })
        .then((response) => {
          let tokens = response.tokens;
          queryMini(client, tokens).then((o) => setTokensObj(o));
          console.log("got tokens ids:", tokens);
        });
    }
  }, [client]);

  return (
    <div>
      {isMobile ? (
        <p className={styles.title}>Mobile devices currently not supported</p>
      ) : null}
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
