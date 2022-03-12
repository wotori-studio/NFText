import { useState, useEffect } from "react";

import { NFT } from "../../models/NFT";
import { Metadata } from "../../models/Metadata"

import { useSigningClient } from "./../../context/cosmwasm";
import NFText from "../NFText/NFText";
import NFImage from "../NFImage/NFImage";

import styles from "./NFTBrowser.module.sass";

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT as string;

interface Properties {
  mode: string;
}

export default function Browser(props: Properties) {
  const { mode } = props;

  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [manyNFT, setManyNFT] = useState<NFT[]>([]);

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      connectWallet();
      return;
    }

    signingClient
      .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
      .then((res: any) => {
        const manyMetadata = [];
        let EXCLUDE_LIST = [8];

        for (let i = 1; i <= res.count; i++) {
          if (!EXCLUDE_LIST.includes(i)) {
            manyMetadata.push(
              signingClient.queryContractSmart(PUBLIC_CW721_CONTRACT, {
                all_nft_info: { token_id: i + "" },
              })
            );
          }
        }

        Promise.all(manyMetadata)
          .then((manyMetadata) => {
            const manyNFT: NFT[] = manyMetadata.map((metadata, index) => {
              console.log(metadata);
              const decodedMetadata = JSON.parse(Buffer.from(metadata.info.token_uri.slice(30), "base64").toString());

              const newNFT: NFT = {
                id: index + 1,
                owner: metadata.access.owner,
                name: decodedMetadata.title,
                type: decodedMetadata.type,
                href: `/items/${index + 1}`,
                content: decodedMetadata.content || "https://dummyimage.com/404x404"
              };

              return newNFT;
            });

            setManyNFT(manyNFT);
            return manyNFT;
          });
      })
      .catch((error: any) => {
        alert(`Error! ${error.message}`);
        console.log("Error signingClient.queryContractSmart() num_tokens: ", error);
      });
  }, [signingClient, walletAddress, alert]);

  return (
    <div className={styles.nftBrowser}>
      {manyNFT.slice(0).reverse().map( NFT => (
        <>
          {(NFT.type === "text" && mode === "text") &&
            <NFText 
              key={NFT.id}
              owner={NFT.owner} 
              title={NFT.name} 
              textUrl={NFT.content} 
            />
          }
          
          {(NFT.type === "img" && mode === "img") &&
            <NFImage 
              key={NFT.id}
              owner={NFT.owner} 
              title={NFT.name} 
              imageUrl={NFT.content} 
            />
          }
        </>
      ))}
    </div>
  );
}
