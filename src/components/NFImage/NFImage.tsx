import styles from "./NFImage.module.sass";

import NFTService from "./../../services/nftService";

import ModalWindow from "./../ModalWindow/ModalWindow";

import { NFT } from "./../../models/NFT";

import React, { useState } from "react";


interface Properties {
  NFT: NFT;
}

function NFImage(props: Properties) {
  const { NFT } = props;

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);
  
  return (
    <>
      <div className={styles.block}>
        <h2 className={`${styles.title} ${styles.font}`}>{NFTService.getLimitedString(NFT.name, 20, 0, true, "Without title")}</h2>
        <img 
          onLoad={(event) => NFTService.setImageLimits(event, 209)}
          onClick={() => setModalWindowIsOpen(true)}
          className={styles.NFImage}
          src={NFT.content} 
          alt="Error uploading photo, please try reloading the page."
        />
        
        <address className={`${styles.walletAddress} ${styles.font}`}>
          {NFTService.getLimitedString(NFT.owner, 16, 5, true, "Without owner")}
        </address>
      </div>
      
      {modalWindowIsOpen && 
        <ModalWindow isOpen={modalWindowIsOpen} close={() => setModalWindowIsOpen(!modalWindowIsOpen)} NFT={NFT} />
      }
    </>
  );
}

export default NFImage;
