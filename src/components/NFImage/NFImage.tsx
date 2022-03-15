import styles from "./NFImage.module.sass";

import NFTService from "./../../services/nftService";

import React, { useState } from "react";

interface Properties {
  owner: string;
  title: string;
  imageUrl: string;
  avatarUrl?: string;
  name?: string;
}

function NFImage(props: Properties) {
  const { owner, title, imageUrl, avatarUrl, name } = props;

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);
  
  return (
    <>
      <div className={styles.block}>
        <h2 className={`${styles.title} ${styles.font}`}>{NFTService.getLimitedString(title, 20, 0, true, "Without title")}</h2>
        <img 
          onLoad={(event) => NFTService.setImageLimits(event, 209)}
          onClick={() => setModalWindowIsOpen(true)}
          className={styles.NFImage}
          src={imageUrl} 
          alt="Error uploading photo, please try reloading the page."
        />
        
        <address className={`${styles.walletAddress} ${styles.font}`}>
          {NFTService.getLimitedString(owner, 16, 5, true, "Without owner")}
        </address>
      </div>
      
      {/* There will be a modal window component */}
    </>
  );
}

export default NFImage;
