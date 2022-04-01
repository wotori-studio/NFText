import styles from "./ModelViewer.module.sass"
import styles2 from "../NFImage/NFImage.module.sass"
import SceneWithModel from "../SceneWithModel/SceneWithModel";
import { Nft } from "../../models/Nft";
import nftService from "../../services/nftService";
import Link from 'next/link'
import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

interface Properties {
    NFT: Nft;
  }

const ModelViewer = (props: Properties) => {
    const { NFT } = props;
  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

    return (
        <div className={styles.block}>
            {/* <Link href={`/nft?id=${NFT.id}`}> */}
            <div onClick={()=> setModalWindowIsOpen(true)}>
                <a className={`${styles2.title} ${styles2.font}`} target="_blank"> 
                   { NFT.name !== '' ? <span> {NFT.name} </span>: <span> {"title undefined"} </span>}
                    </a>
            </div>
            {/* </Link> */}
            <div className={styles.frame}>
                <SceneWithModel file={NFT.content} />
            </div>
            {/* <Link href={`/user/${NFT.owner}`}> */}
                <a className={`${styles2.walletAddress} ${styles2.font}`} target="_blank">
                    {nftService.getLimitedString(NFT.owner, 16, 5, true, "Without owner")}
                </a>
            {/* </Link> */}
            {modalWindowIsOpen && 
                 <ModalWindow isOpen={modalWindowIsOpen} close={() => setModalWindowIsOpen(!modalWindowIsOpen)} NFT={NFT} />
             }
        </div>
    )
}

export default ModelViewer;