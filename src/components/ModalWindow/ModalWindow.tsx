import styles from "./ModalWindow.module.sass";

import { NFT } from "./../../models/NFT";

import NFTService from "./../../services/nftService";

import { useEffect, useState } from "react";
import axios from "axios";

interface Properties {
  isOpen: boolean;
  close(): void;
  NFT: NFT;
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

  return (
    <div className={styles.background} onClick={event => closeModalWindow(event)}>
      <input type="button" className={styles.close} />
      <div className={styles.window}>
        <div className={styles.interface}>
          <header className={styles.header}>
            <h1>Title: {NFT.name}</h1>
            <h1>Author: {NFT.owner}</h1>
          </header>

          <div className={styles.NFTComponent}>
            {NFT.type === "text" && text ? 
              <span>{text}</span>
            : NFT.type === "img" ?
              <img 
                src={NFT.content} 
                alt="An error occurred while loading the image, please try reloading the page."
                onLoad={(event) => NFTService.setImageLimits(event, innerWidth*0.46)}
              />
            : NFT.type === "gltf" &&
              <span>In development...</span>
            }
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