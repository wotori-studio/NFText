import styles from "./ModalWindow.module.sass";
import ModelViewer from "../ModelViewer";
import nftService from "../../services/nftService";

interface Properties {
  nft: any;
  text: any;
}

export default function NFTBlock(props: Properties) {
  let NFT = props.nft;
  let text = props.text;
  return (
    <>
      <div className={styles.nftBlock}>
        <h1 className={styles.title}>{NFT.name || "title undefined"}</h1>
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
          NFT.type === "3d" && <ModelViewer NFT={NFT} />
        )}
        <address className={styles.owner}>{NFT.owner}</address>
      </div>
    </>
  );
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
