// Styles
import styles from "./NFBrowser.module.sass";

// Dependencies
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

// Models
import { Nft } from "./../../models/Nft";
import { Metadata } from "./../../models/Metadata";

// Services
import nftService from "./../../services/nftService";

// Components
import NFText from "./../NFText/NFText";
import NFImage from "./../NFImage/NFImage";
import ModelViewer from "../ModelViewer";

// Stores
import devStore from "./../../store/devStore";
import nftStore from "../../store/nftStore";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useSigningClient } from "../../context/cosmwasm";


// .env
const PUBLIC_CW721_CONTRACT = process.env
  .NEXT_PUBLIC_APP_CW721_CONTRACT as string;

const RPC_ENDPOINT = process.env
  .NEXT_PUBLIC_CHAIN_RPC_ENDPOINT as string;

  const NFBrowser = observer(() => {
  // const { signingClient } = useSigningClient();
  const [signingClient, setClient] = useState<CosmWasmClient>();
  const [manyNFT, setManyNFT] = useState<Nft[]>([]);

  const getClient = async () => {
    const res = await CosmWasmClient.connect(RPC_ENDPOINT);
    setClient(res);
    console.log("signingClient: ",signingClient)
  };
  getClient()

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    const isDevelopment = process.env.NODE_ENV === "development";
    const isBlockchain = devStore.dataPlatform === "Blockchain";
    const isDatabase = devStore.dataPlatform === "Database"

    if (isProduction || isBlockchain) {
      if (!signingClient) return;
      signingClient
        .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
        .then((res: any) => {
          const manyMetadata: Promise<Metadata>[] = [];

          for (let i = 1; i <= res.count; i++) {
            manyMetadata.push(
              signingClient.queryContractSmart(PUBLIC_CW721_CONTRACT, {
                all_nft_info: { token_id: i + "" },
              })
            );
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
                id: index + 1,
                owner: metadata.access.owner,
                name: decodedMetadata.title,
                type: decodedMetadata.type,
                href: `/items/${index + 1}`,
                content:
                  decodedMetadata.content || "https://dummyimage.com/404x404",
              };

              return newNFT;
            });

            setManyNFT(manyNFT);
          });
        })
        .catch((error: any) => {
          if (process.env.NODE_ENV === "development") {
            console.error(
              `Error signingClient.queryContractSmart() num_tokens: ${error}`
            );
          }
        });
    } else if (isDevelopment && isDatabase) {
      setManyNFT(nftService.getNFTFromDatabase());
    }
  }, [signingClient]);

  return (
    <div className={styles.nftBrowser}>
      {manyNFT
        .slice(0)
        .filter((NFT) => NFT.type === nftStore.typeNFT)
        .reverse()
        .map((NFT) => (
          <>
            {NFT.type === "text" && <NFText NFT={NFT} />}

            {NFT.type === "img" && <NFImage NFT={NFT} />}

            {NFT.type === "3d" && <ModelViewer NFT={NFT} />}
          </>
        ))}
    </div>
  );
});

export default NFBrowser;
