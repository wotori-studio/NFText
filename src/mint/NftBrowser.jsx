import { useState, useEffect } from "react";
import { useSigningClient } from "../../src/context/cosmwasm";
import NFText from "../components/NFText/NFText";
import styles from "./NftBrowser.module.css";

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT || "";

export default function Browser(props) {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [nft, setNft] = useState([]);

  let EXCLUDE_LIST = [8];
  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      connectWallet();
      return;
    }

    signingClient
      .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
      .then((res) => {
        console.log(`number of tokens: ${res.count}`);

        const promises = [];

        for (let i = 1; i <= res.count; i++) {
          if (!EXCLUDE_LIST.includes(i)) {
            promises.push(
              signingClient.queryContractSmart(PUBLIC_CW721_CONTRACT, {
                all_nft_info: { token_id: i + "" },
              })
            );
          }
        }

        Promise.all(promises)
          .then((res) => {
            const items = res.map(async (token, i) => {
              const decodedMetadata = JSON.parse(
                Buffer.from(token.info.token_uri.slice(30), "base64").toString()
              );

              return {
                id: i + 1,
                owner: token.access.owner,
                name: decodedMetadata.title,
                type: decodedMetadata.type,
                href: `/items/${i + 1}`,
                content:
                  decodedMetadata.content || "https://dummyimage.com/404x404",
              };
            });
            return items;
          })
          .then(async (res) => {
            Promise.all(res).then((items) => {
              setNft(items);
              console.log("Queried NFTs", nft);
            });
          });
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log(
          "Error signingClient.queryContractSmart() num_tokens: ",
          error
        );
      });
  }, [signingClient, walletAddress, alert]);

  return (
    <div className={styles.nftBrowser}>
      {nft.reverse().map( item => (
        <>
          {(item.type === "text" && props.mode === "text") &&
            <NFText 
              owner={item.owner} 
              title={item.name} 
              textUrl={item.content} 
            />
          }
          
          {(item.type === "img" && props.mode === "img") &&
            <div style={{ width: "250" }}>
              <h3>title: {item.name}</h3>
              <img src={item.content} width="250" />
              <a href={`/owner/${item.owner}`}>
                <h3>owner: {item.owner.slice(0, 10) + "..."}</h3>
              </a>
            </div>
          }
        </>
      ))}
    </div>
  );
}
