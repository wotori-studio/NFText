import styles from "./ModalWindow.module.sass";
import nftStore from "../../store/nftStore";
import NFText from "../NFText/NFText";
import NFImage from "../NFImage/NFImage";
import ModelViewer from "../ModelViewer";

export default function BasedBlock(props: any) {
  let NFT = props.nft;
  return (
    <div style={{ backgroundColor: "red" }}>
      {/* <div className={styles.create}>
        <input className={styles.createButton} type="button" value="+" />
      </div> */}
      <div className={styles.block}>
        {NFT.parent ? (
          <h2 className={styles.title}>This NFT based on #{NFT.parent}</h2>
        ) : (
          <p className={styles.header}>This Is root nft</p>
        )}
        {nftStore.loadedNFT[NFT.parent - 1]
          ? [nftStore.loadedNFT[NFT.parent - 1]]
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
  );
}
