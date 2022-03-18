import styles from "./DataPlatform.module.sass";

import { useState } from "react";
import { observer } from "mobx-react-lite";

import DevStore from "./../../../../store/devStore";

enum DataPlatformState {
  Close = 0,
  Open = (DevStore.DATA_PLATFORMS.length-1) * 36
}

const DataPlatform = observer(() => {
  const [dataPlatformPanel, setDataPlatformPanel] = useState<DataPlatformState>(DataPlatformState.Close);
  const [arrowStyle, setArrowStyle] = useState(styles.close);

  function openDataPlatformPanel() {
    setDataPlatformPanel(DataPlatformState.Open);
    setArrowStyle(styles.open);
  }
    
  function closeDataPlatformPanel() {
    setDataPlatformPanel(DataPlatformState.Close);
    setArrowStyle(styles.close);
  }

  return (
    <section style={{marginTop: "15px"}}>
      <h1 className={styles.title}>Data platform</h1>
      <button 
        type="button" 
        className={styles.currentPlatform}
        onClick={() => { 
          if (dataPlatformPanel === 0) openDataPlatformPanel();
          else closeDataPlatformPanel();
        }}
      >
        <span className={styles.name}>{DevStore.dataPlatform}</span>
        <div className={`${styles.arrow} ${arrowStyle}`}></div>
      </button>
      
      <div className={styles.panel} style={{height: dataPlatformPanel}}>
        {dataPlatformPanel !== 0 && DevStore.DATA_PLATFORMS
          .filter(platformName => platformName !== DevStore.dataPlatform)
          .map((platformName, index) => 
            <input 
              key={index}
              value={platformName}
              className={styles.platform}
              type="button"
              onClick={() => { 
                DevStore.setDataPlatform(platformName); 
                if (dataPlatformPanel === 0) openDataPlatformPanel();
                else closeDataPlatformPanel();
              }}
            />
          )
        }
      </div>
    </section>
  )
});

export default DataPlatform;
