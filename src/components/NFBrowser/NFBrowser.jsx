// Styles
import styles from "./NFBrowser.module.sass";

// Dependencies
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

// Services
import nftService from "../../services/nftService";

// Contexts
import { useSigningClient } from "../../context/cosmwasm";

// Components
import NFText from "../NFText/NFText";
import NFImage from "../NFImage/NFImage";

// Stores
import devStore from "../../store/devStore";
import nftStore from "../../store/nftStore";
import NF3DPreview from "../NFImage/NF3DPreview";
import getNftTokenAmount from "../../services/tokenId";
import query from "../../services/query";
import treeStore from "../../store/treeStore";

const NFBrowser = observer(() => {
  const { client } = useSigningClient();
  const [amount, setAmount] = useState();
  const [manyNFT, setManyNFT] = useState([]);
  console.log("Browser client: ", client);

  useEffect(() => {
    console.log("Let's build a tree! Nfts are here:", manyNFT);
    console.log("current tree state:", treeStore.tree);
    let treeProxy = {};
    for (const i in manyNFT) {
      let curObj = manyNFT[i];

      if (!treeProxy[curObj.parent]) {
        treeProxy[curObj.parent] = [];
      }

      if (curObj.parent) {
        treeProxy[curObj.parent].push(curObj.id);
      }
      treeStore.setTree(treeProxy);
      console.log("The tree is ready! At least I hope so.", treeStore.tree);
    }
  }, [manyNFT]);

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    const isDevelopment = process.env.NODE_ENV === "development";
    const isBlockchain = devStore.dataPlatform === "Blockchain";
    const isDatabase = devStore.dataPlatform === "Database";

    const getAmount = async (client) => {
      if (!client) return;
      getNftTokenAmount(client, setAmount);
    };

    const queryNft = async (client) => {
      if (!client) return;
      query(client, amount, setManyNFT);
    };

    if ((isProduction || isBlockchain) && client) {
      getAmount(client);
      console.log("amount", amount);
      if (amount) queryNft(client);
    } else if (isDevelopment && isDatabase) {
      setManyNFT(nftService.getNFTFromDatabase());
    }
  }, [client, amount]);

  let ignoreList = [12]; // TODO: move this to cloud variables
  return (
    <div className={styles.nftBrowser}>
      {manyNFT
        .slice(0)
        .filter((NFT) => NFT.type === nftStore.typeNFT)
        .reverse()
        .map((NFT) =>
          !ignoreList.includes(NFT.id) ? (
            <>
              {NFT.type === "text" && <NFText NFT={NFT} />}

              {NFT.type === "img" && <NFImage NFT={NFT} />}

              {NFT.type === "3d" && <NF3DPreview NFT={NFT} />}
            </>
          ) : null
        )}
    </div>
  );
});

export default NFBrowser;
