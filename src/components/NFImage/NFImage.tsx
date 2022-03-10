import styles from "./NFImage.module.sass";

import React, { useState } from "react";

interface Properties {
  owner: string;
  title: string;
  imageUrl: string;
  avatarUrl?: string;
  name?: string;
}

function NFImage(props: Properties) {
  const { owner, title, imageUrl, avatarUrl, name } = props;

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

  const openModalWindow = () => setModalWindowIsOpen(true);
  const closeModalWindow = () => setModalWindowIsOpen(false);

  function getLimitedString(text: string, maxlength: number, lastSymbols: number, isBeautifulEnding: boolean = true, textMissingWarning?: string): string {
    if (text.length === 0 && textMissingWarning) {
      return textMissingWarning;
    }

    if (text.length <= maxlength) {
      return text;
    }

    if (lastSymbols) {
      return `${text.substring(0, maxlength)}...${text.substring(text.length - lastSymbols)}`;
    }

    let limitedString = text.substring(0, maxlength)

    if (isBeautifulEnding && !lastSymbols) {
      let lastSymbolsAfterSpace = limitedString.split(" ").slice(-1)[0];

      const isManyLastSymbols = (
        lastSymbolsAfterSpace.length === limitedString.length || 
        lastSymbolsAfterSpace.length >= limitedString.length/2
      );
      if (isManyLastSymbols) {
        return `${limitedString}...`;
      }

      const lengthLimitedString = limitedString.length;
      const lengthLastSymbolsAndSpace = lastSymbolsAfterSpace.length+1;
      const maxLengthForBeautifulText = lengthLimitedString - lengthLastSymbolsAndSpace;
      
      const limitedStringWithoutLastSymbols = limitedString.substring(0, maxLengthForBeautifulText);
      return `${limitedStringWithoutLastSymbols}...`;
    }

    return `${limitedString}...`;
  }

  async function loadImage(event: React.SyntheticEvent<HTMLImageElement>) {
    let NFImage = event.target as HTMLImageElement;
    let scaleX = 209 / NFImage.width;
    let normalizedSizeY = NFImage.width > NFImage.height ? NFImage.height * scaleX : NFImage.width * scaleX;

    NFImage.height = normalizedSizeY;
    NFImage.setAttribute('style', 'display: inline');
  }

  return (
    <>
      <div className={styles.block}>
        <h2 className={`${styles.title} ${styles.font}`}>{getLimitedString(title, 20, 0, true, "Without title")}</h2>
        <img 
          style={{display: "none"}}
          onLoad={(event) => loadImage(event)}
          onClick={() => openModalWindow()}
          className={styles.NFImage}
          src={imageUrl} 
          alt="Error uploading photo, please try reloading the page."
        />
        
        <address className={`${styles.walletAddress} ${styles.font}`}>
          {getLimitedString(owner, 16, 5, true, "Without owner")}
        </address>
      </div>
      
      {/* Modal window */}
      {modalWindowIsOpen &&
        <div className={styles.modalWindowBackground}>
          <div className={styles.modalWindow}>

            <input type="button" className={styles.closeModalWindow} onClick={() => closeModalWindow()} />

          </div>
        </div>
      }
    </>
  );
}

export default NFImage;
