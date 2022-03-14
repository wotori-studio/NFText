import styles from "./NFText.module.sass";

import NFTService from "./../../services/nftService";

import { useState, useEffect } from "react";
import axios from "axios";

interface Properties {
  owner: string;
  title: string;
  textUrl: string;
  avatarUrl?: string;
  name?: string;
  dataA?: string; // JSON
  dataB?: string; // JSON
  dataC?: string; // JSON
};

function NFText(props: Properties) {
  const { owner, title, textUrl, avatarUrl, name, dataA, dataB, dataC } = props;

  const [text, setText] = useState("");
  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      axios.get(textUrl).then( response => setText(response.data) );
    }
    else if (process.env.NODE_ENV === "development") {
      setText(textUrl);
    }
    
  }, []);

  return (
    <>
      <div className={styles.block}>
        <div className={styles.body} onClick={() => setModalWindowIsOpen(true)}>
          <span className={`${styles.title} ${styles.font}`}>{NFTService.getLimitedString(title, 20, 0, true, "Without title")}</span>
          <span className={`${styles.text} ${styles.font}`}>
            {NFTService.getLimitedString(text, 69, 0, true, "Without text")}
          </span>                            
          <address className={`${styles.walletAddress} ${styles.font}`}>{NFTService.getLimitedString(owner, 16, 5, true, "Without owner")}</address>
        </div>

        {dataA && dataB && dataC &&
          <div className={styles.footer}>
            <div className={`${styles.figure} ${styles.first}`}></div>
            <div className={`${styles.figure} ${styles.second}`}></div>
            <div className={`${styles.figure} ${styles.last}`}></div>
          </div>  
        }
      </div>
      
      {/* There will be a modal window component */}
    </>
  );
} 

export default NFText;
