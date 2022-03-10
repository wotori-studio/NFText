import styles from "./NFImage.module.sass";

import NFT from "./../../services/nft";

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

  const openModalWindow = () => setModalWindowIsOpen(true);
  const closeModalWindow = () => setModalWindowIsOpen(false);

  

  async function loadImage(event: React.SyntheticEvent<HTMLImageElement>) {
    let NFImage = event.target as HTMLImageElement;
    let scaleX = 209 / NFImage.width;
    let normalizedSizeY = NFImage.width > NFImage.height ? NFImage.height * scaleX : NFImage.width * scaleX;

    NFImage.height = normalizedSizeY;
    NFImage.setAttribute('style', 'display: inline');
  }

  return (
    <>
      <div className={styles.block}>
        <h2 className={`${styles.title} ${styles.font}`}>{NFT.getLimitedString(title, 20, 0, true, "Without title")}</h2>
        <img 
          style={{display: "none"}}
          onLoad={(event) => loadImage(event)}
          onClick={() => openModalWindow()}
          className={styles.NFImage}
          src={imageUrl} 
          alt="Error uploading photo, please try reloading the page."
        />
        
        <address className={`${styles.walletAddress} ${styles.font}`}>
          {NFT.getLimitedString(owner, 16, 5, true, "Without owner")}
        </address>
      </div>
      
      {/* Modal window */}
      {modalWindowIsOpen &&
        <div className={styles.modalWindowBackground}>
          <div className={styles.modalWindow}>

            <input type="button" className={styles.closeModalWindow} onClick={() => closeModalWindow()} />

          </div>
        </div>
      }
    </>
  );
}

export default NFImage;
