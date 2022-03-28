import styles from "./ModelViewer.module.sass"
import styles2 from "../NFImage/NFImage.module.sass"
import SceneWithModel from "../SceneWithModel/SceneWithModel";
import { Nft } from "../../models/Nft";
import nftService from "../../services/nftService";
import Link from 'next/link'

interface Properties {
    NFT: Nft;
  }

const ModelViewer = (props: Properties) => {
    const { NFT } = props;
    return (
        <div className={styles.block}>
            <Link href={`/nft/${NFT.id}`}>
                <a className={`${styles2.title} ${styles2.font}`} target="_blank">{NFT.name}</a>
            </Link>
            <div className={styles.frame}>
                <SceneWithModel file={NFT.content} />
            </div>
            <Link href={`/user/${NFT.owner}`}>
                <a className={`${styles2.walletAddress} ${styles2.font}`} target="_blank">
                    {nftService.getLimitedString(NFT.owner, 16, 5, true, "Without owner")}
                </a>
            </Link>
        </div>
    )
}

export default ModelViewer;