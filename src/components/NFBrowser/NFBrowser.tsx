// Styles
import styles from "./NFBrowser.module.sass";

// Dependencies
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// Models
import { Nft } from "./../../models/Nft";
import { Metadata } from "./../../models/Metadata";

// Services
import nftService from "./../../services/nftService";

// Contexts
import { useSigningClient } from "./../../context/cosmwasm";

// Components
import NFText from "./../NFText/NFText";
import NFImage from "./../NFImage/NFImage";

// Stores
import devStore from "./../../store/devStore";
import nftStore from "../../store/nftStore";
import ModelViewer from "../ModelViewer";
import NF3DPreview from "../NFImage/NF3DPreview";

// .env
const PUBLIC_CW721_CONTRACT = process.env
  .NEXT_PUBLIC_APP_CW721_CONTRACT as string;

const NFBrowser = observer(() => {
  const { client } = useSigningClient();
  const [manyNFT, setManyNFT] = useState<Nft[]>([]);
  console.log("Browser client: ", client);

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    const isDevelopment = process.env.NODE_ENV === "development";
    const isBlockchain = devStore.dataPlatform === "Blockchain";
    const isDatabase = devStore.dataPlatform === "Database";

    if (isProduction || isBlockchain) {
      if (!client) return;

      client
        .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
        .then((res: any) => {
          const manyMetadata: Promise<Metadata>[] = [];
          let EXCLUDE_LIST = [8];

          for (let i = 1; i <= res.count; i++) {
            if (!EXCLUDE_LIST.includes(i)) {
              manyMetadata.push(
                client.queryContractSmart(PUBLIC_CW721_CONTRACT, {
                  all_nft_info: { token_id: i + "" },
                })
              );
            }
          }

          Promise.all(manyMetadata).then((manyMetadata) => {
            const manyNFT: Nft[] = manyMetadata.map((metadata, index) => {
              const decodedMetadata = JSON.parse(
                Buffer.from(
                  metadata.info.token_uri.slice(30),
                  "base64"
                ).toString()
              );

              const newNFT: Nft = {
                id: index + 1, // TODO: get real index
                owner: metadata.access.owner,
                name: decodedMetadata.title,
                type: decodedMetadata.type,
                href: `/items/${index + 1}`,
                content:
                  decodedMetadata.content || "https://dummyimage.com/404x404",
                parent: decodedMetadata.parent,
                preview: decodedMetadata.preview || "https://dummyimage.com/600x400/1aeddf/ffffff&text=3D+file" // TODO: create preview for 3D files
              };

              return newNFT;
            });

            setManyNFT(manyNFT);
            console.log(manyNFT);
          });
        })
        .catch((error: any) => {
          if (process.env.NODE_ENV === "development") {
            console.error(
              `Error client.queryContractSmart() num_tokens: ${error}`
            );
          }
        });
    } else if (isDevelopment && isDatabase) {
      setManyNFT(nftService.getNFTFromDatabase());
    }
  }, [client, alert]);

  let ignoreList = [0] // TODO: move this to cloud variables
  return (
    <div className={styles.nftBrowser}>
      {manyNFT
        .slice(0)
        .filter((NFT) => NFT.type === nftStore.typeNFT)
        .reverse()
        .map((NFT) => ( !ignoreList.includes(NFT.id) ? 
          <>
            {NFT.type === "text" && <NFText NFT={NFT} />}

            {NFT.type === "img" && <NFImage NFT={NFT} />}

            {NFT.type === "3d" && <NF3DPreview NFT={NFT} />}
          </> : null)
        )}
    </div>
  );
});

export default NFBrowser;
