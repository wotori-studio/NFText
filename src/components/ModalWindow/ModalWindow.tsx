import styles from "./ModalWindow.module.sass";

import { Nft } from "./../../models/Nft";

import nftService from "./../../services/nftService";

import { useEffect, useState } from "react";
import axios from "axios";

interface Properties {
  isOpen: boolean;
  close(): void;
  NFT: Nft;
}

function ModalWindow(props: Properties) {
  const { isOpen, close, NFT } = props;

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(isOpen);
  const [text, setText] = useState<string>();

  useEffect(() => {
    setModalWindowIsOpen(isOpen);
    getText();

    if (
      NFT.type !== "text" && NFT.type !== "img" && NFT.type !== "gltf" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(`Received unknown NFT type: ${NFT.type}`);
    }
   
  }, [modalWindowIsOpen]);

  function closeModalWindow(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const targetClassName = (event.target as HTMLElement).className;

    const clickedToBackground = targetClassName === styles.background;
    const clickedToCloseButton = targetClassName === styles.close;

    if (clickedToBackground || clickedToCloseButton) {
      close();
    }
  }

  function getText(): void {
    if (process.env.NODE_ENV === "production") {
      axios.get(NFT.content).then( response => setText(response.data));
    }
    else if (process.env.NODE_ENV === "development") {
      setText(NFT.content);
    }
  }

  function calculateSizeForImage(): number {
    const portrait = "portrait";
    const landscape = "landscape";
    const orientation = innerWidth > innerHeight ? landscape : portrait;

    /**
     * All numbers are obtained from media queries of the "window" class, 
     * so when adjusting media queries, you will need to write them here.
     */
    if (orientation === landscape) {
      return innerWidth < 780 
        ? innerWidth * 0.55 : innerWidth < 850
        ? innerWidth * 0.45 : innerWidth > 850
        ? innerWidth * 0.35 : 0;
    }
    else if (orientation === portrait) {
      return innerWidth * 0.8;
    }
    else {
      if (process.env.NODE_ENV === "development") {
        console.error("An error occurred while calculating the image size.")
      }
      return 0;
    }
  }

  return (
    <div className={styles.background} onClick={event => closeModalWindow(event)}>
      <input type="button" className={styles.close} />
      <div className={styles.window}>
        <div className={styles.interface}>

          <h1 className={styles.title}>{NFT.name}</h1>

          <div className={styles.NFTComponent}>
            {NFT.type === "text" && text ? 
              <span>{text}</span>
            : NFT.type === "img" ?
              <img 
                src={NFT.content} 
                alt="An error occurred while loading the image, please try reloading the page."
                onLoad={(event) => 
                  nftService.setImageLimits(event, calculateSizeForImage())}
              />
            : NFT.type === "gltf" &&
              <span>In development...</span>
            }
            <address className={styles.owner}>{NFT.owner}</address>
          </div>

          <footer className={styles.footer}>
            <h2>Content based on this NFT:</h2>
            <input className={styles.createButton} type="button" value="+" />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;