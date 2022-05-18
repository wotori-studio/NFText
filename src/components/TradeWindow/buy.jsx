import { useEffect, useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import queryMini from "../../services/query/queryMini";
import dappState from "../../store/dappState";
import WrapBuy from "../WrapTrade/WrapBuy";
import style from "./trade.module.sass";

const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";

const BuySection = () => {
  const { client } = useSigningClient();
  const [tokensObj, setTokensObj] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [marketIDs, setMarketIDs] = useState([]);

  useEffect(() => {
    dappState.setStateAndOn("Loading content");
    client
      .queryContractSmart(MARKETPLACE, { get_offerings: {} })
      .then((tokensForSale) => {
        console.log(tokensForSale);
        let offerings = tokensForSale.offerings;
        let tokens = [];
        let prices = [];
        let marketIDs = [];
        for (const index in offerings) {
          console.log(`iteration #${index}`, offer);
          let offer = offerings[index];
          tokens.push(offer.token_id);
          prices.push(offer.list_price.amount);
          marketIDs.push(offer.id);
        }
        setPriceList(prices.reverse());
        setMarketIDs(marketIDs.reverse());
        queryMini(client, tokens).then((o) => setTokensObj(o));
        console.log("query tokens:", tokensObj);
        dappState.setOff();
      });
  }, [client]);
  return (
    <div>
      <div className={style.nftBrowser}>
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
