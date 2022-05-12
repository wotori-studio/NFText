import nftStore from "../../store/nftStore";
import NF3DPreview from "../NFImage/NF3DPreview";
import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import styles from "./ModalWindow.module.sass";

export default function ChildrenBlock(props: any) {
  let NFT = props.nft;
  return (
    <div style={{ backgroundColor: "red" }}>
      <div className={styles.block}>
        <h2 className={styles.header}>
          {nftStore.tree[NFT.id]
            ? "NFTs based on this:"
            : "There is no nfts based on this one yet"}
        </h2>
        {/* TODO: queried sm contract data with childrens*/}
        <div>
          {nftStore.loadedNFT
            ? nftStore.loadedNFT
                .slice(0)
                .reverse()
                .map((mNFT) =>
                  nftStore.tree[NFT.id] ? (
                    nftStore.tree[NFT.id].includes(mNFT.id) ? (
                      <>
                        {mNFT.type === "text" ? (
                          <NFText NFT={mNFT} />
                        ) : mNFT.type === "img" ? (
                          <NFImage NFT={mNFT} />
                        ) : mNFT.type === "3d" ? (
                          <NF3DPreview NFT={mNFT} />
                        ) : null}
                      </>
                    ) : null
                  ) : null
                )
            : null}
        </div>
      </div>
    </div>
  );
}
