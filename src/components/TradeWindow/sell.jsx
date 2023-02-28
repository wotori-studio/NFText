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
    if (!isMobile && walletAddress) {
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
      {!walletAddress ? (
        <p className={styles.title}>Login to be able to mint and sell NFTs</p>
      ) : null}
      <div className={styles.nftBrowser}>
        {tokensObj !== []
          ? tokensObj
              .slice(0)
              .reverse()
              .map((NFT) => (
                <>
                  <WrapSell NFT={NFT} />
                </>
              ))
          : "You don't have nft for sell"}
      </div>
    </div>
  );
};

export default SellSection;
