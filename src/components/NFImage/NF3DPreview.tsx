import styles from "./NFImage.module.sass";

import nftService from "../../services/nftService";

import ModalWindow from "../ModalWindow/ModalWindow";

import { Nft } from "../../models/Nft";

import React, { useState } from "react";

interface Properties {
  NFT: Nft;
}

function NF3DPreview(props: Properties) {
  const { NFT } = props;

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

  return (
    <>
      <div className={styles.block}>
        <h2 className={`${styles.title} ${styles.font}`}>
          {nftService.getLimitedString(NFT.name, 20, 0, true, "Without title")}
        </h2>
        <img
          onLoad={(event) => nftService.setImageLimits(event, 209)}
          onClick={() => setModalWindowIsOpen(true)}
          className={styles.NFImage}
          src={
            NFT.preview
              ? NFT.preview
              : "https://dummyimage.com/600x400/1aeddf/ffffff&text=3D+file"
          }
          alt="Error uploading photo, please try reloading the page."
        />

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

export default NF3DPreview;
