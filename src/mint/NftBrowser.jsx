import { useState, useEffect } from "react";
import { useSigningClient } from "../../src/context/cosmwasm";
import TextBox from "../components/textBox";
const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT || "";

export default function Browser(props) {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [nft, setNft] = useState([]);

  let EXCLUDE_LIST = [8]
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
              nft_info: { token_id: i + "" },
            })
          );
          }
        }

        Promise.all(promises)
          .then((res) => {
            const items = res.map(async (token, i) => {
              const decodedMetadata = JSON.parse(
                Buffer.from(token.token_uri.slice(30), "base64").toString()
              );

              return {
                id: i + 1,
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
    <div style={{display: 'flex', 
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    }}>
      {nft.slice(0).reverse().map(item => (
        <>
        {item.type ==="img" && props.mode === "img" ? (
        <div>
          <h3>{item.name}</h3>
          <img src={item.content} width="250"/>
        </div>
        ) : null}
        {item.type ==="text" && props.mode === "text" ? (
        <div>
          <h3>{item.name}</h3>
          <TextBox text_link={item.content}/>
        </div>
        ) : null}
        </>
      ))}
    </div>
  );
}
