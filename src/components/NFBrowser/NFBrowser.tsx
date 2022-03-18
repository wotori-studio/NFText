// Styles
import styles from "./NFBrowser.module.sass";

// Dependencies
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

// Models
import { Nft } from "./../../models/Nft";

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

const NFBrowser = observer(() => {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [manyNFT, setManyNFT] = useState<Nft[]>([]);

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    const isDevelopment = process.env.NODE_ENV === "development";
    const isBlockchain = devStore.dataPlatform === "Blockchain";
    const isDatabase = devStore.dataPlatform === "Database";

    if (isProduction || isBlockchain) {
      setManyNFT(nftService.getNFTFromBlockchain(walletAddress, signingClient, connectWallet));
    }
    else if (isDevelopment && isDatabase) {
      setManyNFT(nftService.getNFTFromDatabase());
    }
  }, [signingClient, walletAddress, alert]);

  return (
    <div className={styles.nftBrowser}>
      {manyNFT.slice(0).filter(NFT => NFT.type === nftStore.typeNFT).reverse().map( NFT => (
        <>
          {NFT.type === "text" &&
            <NFText NFT={NFT} />
          }
          
          {NFT.type === "img" &&
            <NFImage NFT={NFT} />
          }
        </>
      ))}
    </div>
  );
});

export default NFBrowser;
