import { useState, useEffect } from "react";
import { useSigningClient } from "../../src/context/cosmwasm";
const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT || "";

export default function Browser(props) {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [nft, setNft] = useState([]);

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
          promises.push(
            signingClient.queryContractSmart(PUBLIC_CW721_CONTRACT, {
              nft_info: { token_id: i + "" },
            })
          );
        }

        Promise.all(promises)
          .then((res) => {
            const items = res.map(async (token, i) => {
              const decodedMetadata = JSON.parse(
                Buffer.from(token.token_uri.slice(30), "base64").toString()
              );

              return {
                id: i + 1,
                name: decodedMetadata.name,
                href: `/items/${i + 1}`,
                imageSrc:
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
    <>
      <p>{props.mode} browser mode in developmen...</p>
      {nft.map((item) => (
        <a className="group">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img src={item.imageSrc} />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
        </a>
      ))}
    </>
  );
}
