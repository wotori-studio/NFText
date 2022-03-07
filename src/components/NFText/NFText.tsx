import styles from "./NFText.module.css";

import Link from "next/link";

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

  const openModalWindow = () => setModalWindowIsOpen(true);
  const closeModalWindow = () => setModalWindowIsOpen(false);

  useEffect(() => {
    axios.get(textUrl).then( response => setText(response.data) );
  }, []);


  return (
    <>
      {/* Text */}
      <div className={styles.block}>
        <div className={styles.body} onClick={() => openModalWindow()}>
          <span className={`${styles.title} ${styles.font}`}>{title}</span>
          <span className={`${styles.text} ${styles.font}`}>
            {text.substring(0, 69) + `${text.length > 69 ? "..." : ""}`}
          </span>                            
          <address className={`${styles.walletAddress} ${styles.font}`}>{owner.substring(0, 16) + "..." + owner.substring(owner.length-5)}</address>
        </div>

        {dataA && dataB && dataC &&
          <div className={styles.footer}>
            <div className={`${styles.figure} ${styles.first}`}></div>
            <div className={`${styles.figure} ${styles.second}`}></div>
            <div className={`${styles.figure} ${styles.last}`}></div>
          </div>  
        }
      </div>
      
      {/* Modal window */}
      {modalWindowIsOpen &&
        <div className={styles.modalWindowBackground}>
          <div className={styles.modalWindow}>

            <input type="button" className={styles.closeModalWindow} onClick={() => closeModalWindow()} />
          
            {/* Header with user info */}
            {(avatarUrl || name) &&
              <div className={styles.userInfo}>
                {avatarUrl && 
                  <img 
                    className={styles.avatar}
                    width={41} 
                    height={41} 
                    src={avatarUrl} 
                    alt="Error getting avatar" 
                  />
                }
                {name && 
                  <span className={`${styles.name} ${!avatarUrl ? styles.onlyName : ''} ${styles.font}`}>
                    {name}
                  </span>
                }
              </div>
            }
          
            {/* Full NFText */}
            <div className={styles.NFTextFullInfo} style={{height: !avatarUrl && !name ? '93%' : '80%'}}>
              <span className={`${styles.titleInModalWindow} ${styles.font}`}>{title}</span>
              <div className={styles.scrollbar}>
                <span className={`${styles.text} ${styles.font}`}>
                  {text}
                </span>
              </div>
            </div>

            {/* Owner */}
            <Link href={`/owner/${owner}`} >
              <a className={`${styles.walletAddress} ${styles.font}`}>
                <address>
                  {owner}
                </address>  
              </a>
            </Link>

          </div>
        </div>
      }
    </>
  );
} 

export default NFText;
