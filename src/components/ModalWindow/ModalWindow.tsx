// Styles
import styles from "./ModalWindow.module.sass";

// Models
import { Nft } from "./../../models/Nft";

// Services
import nftService from "./../../services/nftService";

// Dependencies
import { useEffect, useState } from "react";
import axios from "axios";

// Stores
import devStore from "./../../store/devStore";
import NFUploader from "../NFUploader/NFUploader";
import { useSigningClient } from "../../context/cosmwasm";
import query from "../../services/query";
import NFText from "../NFText/NFText";
import NFImage from "../NFImage/NFImage";
import ModelViewer from "../ModelViewer";

interface Properties {
  isOpen: boolean;
  close(): void;
  NFT: Nft;
}

function ModalWindow(props: Properties) {
  const { client } = useSigningClient();
  const { isOpen, close, NFT } = props;
  const [mode, setMode] = useState<string>("text");

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(isOpen);
  const [text, setText] = useState<string>();

  const [nfts, setNfts] = useState<Array<Nft>>();
  const [children, setChildren] = useState<Array<number>>([1, 2, 3]);

  useEffect(() => {
    setModalWindowIsOpen(isOpen);
    getText();

    if (!nfts) {
      let data = query(client, children, setNfts);
      data.then((obj) => {
        console.log("modal from query", obj);
      });
    } else {
      console.log("nfts:", nfts);
    }

    if (
      NFT.type !== "text" &&
      NFT.type !== "img" &&
      NFT.type !== "3d" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(`Received unknown NFT type: ${NFT.type}`);
    }
  }, [modalWindowIsOpen, nfts]);

  function closeModalWindow(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const targetClassName = (event.target as HTMLElement).className;

    const clickedToBackground = targetClassName === styles.background;
    const clickedToCloseButton = targetClassName === styles.close;

    if (clickedToBackground || clickedToCloseButton) {
      close();
    }
  }

  function getText(): void {
    if (
      process.env.NODE_ENV === "production" ||
      devStore.dataPlatform === "Blockchain"
    ) {
      axios.get(NFT.content).then((response) => setText(response.data));
    } else if (
      process.env.NODE_ENV === "development" &&
      devStore.dataPlatform === "Database"
    ) {
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
        ? innerWidth * 0.55
        : innerWidth < 850
        ? innerWidth * 0.45
        : innerWidth > 850
        ? innerWidth * 0.35
        : 0;
    } else if (orientation === portrait) {
      return innerWidth * 0.8;
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("An error occurred while calculating the image size.");
      }
      return 0;
    }
  }

  function handleModeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setMode(event.target.value);
    console.log("Modal mode: ", mode);
  }

  return (
    <div
      className={styles.background}
      onClick={(event) => closeModalWindow(event)}
    >
      <input type="button" className={styles.close} />
      <div className={styles.window}>
        <div className={styles.interface}>
          <h1 className={styles.title}>{NFT.name}</h1>

          <div className={styles.NFTComponent}>
            {NFT.type === "text" && text ? (
              <span>{text}</span>
            ) : NFT.type === "img" ? (
              <img
                src={NFT.content}
                alt="An error occurred while loading the image, please try reloading the page."
                onLoad={(event) =>
                  nftService.setImageLimits(event, calculateSizeForImage())
                }
              />
            ) : (
              NFT.type === "3d" && <ModelViewer NFT={NFT}/>
            )}
            <address className={styles.owner}>{NFT.owner}</address>
          </div>

          {/* <div className={styles.create}>
            <input className={styles.createButton} type="button" value="+" />
          </div> */}
          <div>
            <h2>This NFT based on #{NFT.parent}</h2>
          </div>
          <div>
            {NFT.parent}
            <h2>Create new NFT based on this:</h2>
            <select
              name="modes"
              className="{styles.modes}"
              value={mode}
              onChange={(e) => {
                handleModeChange(e);
              }}
            >
              <option value="text">text</option>
              <option value="img">img</option>
              <option value="3d">3d</option>
            </select>
            <NFUploader modalMode={mode} parentId={NFT.id} />
          </div>
          <div>
            <h2>Content based on this NFT:</h2>
            {/* TODO: queried sm contract data with childrens*/}
            {children}
            {nfts
              ? nfts
                  .slice(0)
                  .reverse()
                  .map((NFT) => (
                    <>
                      {NFT.type === "text" ? (
                        <NFText NFT={NFT} />
                      ) : NFT.type === "img" ? (
                        <NFImage NFT={NFT} />
                      ) : NFT.type === "3d" ? (
                        <ModelViewer NFT={NFT} />
                      ) : null}
                    </>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
