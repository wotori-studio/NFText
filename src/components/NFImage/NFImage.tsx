import styles from "./NFImage.module.sass";

import nftService from "./../../services/nftService";

import ModalWindow from "./../ModalWindow/ModalWindow";

import { Nft } from "./../../models/Nft";

import React, { useState } from "react";

interface Properties {
  NFT: Nft;
}

function NFImage(props: Properties) {
  const { NFT } = props;
  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let imgUrl;
  if (NFT.type === "img") {
    imgUrl = NFT.content;
  }
  if (NFT.type === "3d") {
    if (NFT.preview) {
      imgUrl = NFT.preview;
    } else {
      imgUrl = "https://dummyimage.com/600x400/1aeddf/ffffff&text=3D+file";
    }
  }

  function updateState(event: any) {
    nftService.setImageLimits(event, 209);
    setLoaded(true);
    console.log("loaded?", loaded);
  }

  return (
    <>
      <div className={styles.block}>
        <h2 className={`${styles.title} ${styles.font}`}>
          {nftService.getLimitedString(NFT.name, 20, 0, true, "undefined")}
        </h2>
        <img
          onLoad={(event) => updateState(event)}
          onClick={() => setModalWindowIsOpen(true)}
          className={styles.NFImage}
          src={imgUrl}
          alt="Error loading the image, try reloading the page."
        />
        {!loaded ? (
          <img className={styles.preloader} src="/assets/loader.webp"></img>
        ) : null}
        <address className={`${styles.walletAddress} ${styles.font}`}>
          {nftService.getLimitedString(NFT.owner, 16, 5, true, "Without owner")}
        </address>
      </div>

      {modalWindowIsOpen && (
        <ModalWindow
          isOpen={modalWindowIsOpen}
          close={() => setModalWindowIsOpen(!modalWindowIsOpen)}
          NFT={NFT}
        />
      )}
    </>
  );
}

export default NFImage;
