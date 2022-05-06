import { useEffect, useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import queryMini from "../../services/query/queryMini";
import WrapBuy from "../WrapTrade/WrapBuy";
import styles from "./trade.module.sass";

const CW721 = process.env.NEXT_PUBLIC_CW721 || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";

const BuySection = () => {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [tokensObj, setTokensObj] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [marketIDs, setMarketIDs] = useState([]);

  useEffect(() => {
    signingClient
      .queryContractSmart(MARKETPLACE, { get_offerings: {} })
      .then((tokensForSale) => {
        console.log(tokensForSale);
        let offerings = tokensForSale.offerings;
        let tokens = [];
        let prices = [];
        let marketIDs = [];
        for (const index in offerings) {
          let offer = offerings[index];
          console.log(`iteration #${index}`, offer);
          tokens.push(offer.token_id);
          prices.push(offer.list_price.amount);
          marketIDs.push(offer.id);
        }
        setPriceList(prices);
        setMarketIDs(marketIDs);
        console.log("Query list:", tokens);
        queryMini(signingClient, tokens).then((o) => setTokensObj(o));
        console.log("got tokens ids:", tokens);
      });
  }, [signingClient]);
  return (
    <div>
      <div>This all asset in the market that you able to buy</div>
      <div>buy section with items</div>
      <div className={styles.nftBrowser}>
        {tokensObj
          .slice(0)
          .reverse()
          .map((NFT, index) => (
            <>
              <WrapBuy
                NFT={NFT}
                price={priceList[index]}
                marketID={marketIDs[index]}
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default BuySection;
