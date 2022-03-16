import { useState, useEffect } from "react";

import { NFT } from "./../../models/NFT";
import NFTService from "./../../services/nftService";

import { useSigningClient } from "./../../context/cosmwasm";
import NFText from "./../NFText/NFText";
import NFImage from "./../NFImage/NFImage";

import styles from "./NFBrowser.module.sass";

interface Properties {
  mode: string;
}

export default function Browser(props: Properties) {
  const { mode } = props;

  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [manyNFT, setManyNFT] = useState<NFT[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      setManyNFT(NFTService.getNFTFromBlockchain(walletAddress, signingClient, connectWallet));
    }
    else if (process.env.NODE_ENV === 'development') {
      setManyNFT(NFTService.getNFTFromDatabase());
    }
    
  }, [signingClient, walletAddress, alert]);

  return (
    <div className={styles.nftBrowser}>
      {manyNFT.slice(0).reverse().map( NFT => (
        <>
          {(NFT.type === "text" && mode === "text") &&
            <NFText NFT={NFT} />
          }
          
          {(NFT.type === "img" && mode === "img") &&
            <NFImage NFT={NFT} />
          }
        </>
      ))}
    </div>
  );
}
