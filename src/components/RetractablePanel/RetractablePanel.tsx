import styles from "./RetractablePanel.module.sass";

import { useState } from "react";
import { observer } from "mobx-react-lite";

import DevStore from "./../../store/devStore";

const RetractablePanel = observer(() => {
  const [panelPosition, setPanelPosition] = useState(-250);
  const [modesPanelHeight, setModesPanelHeight] = useState(0)
  const [swipeButton, setSwipeButton] = useState(styles.open)

  function changeMode() {
    panelPosition >= 0 ? setPanelPosition(-250) : setPanelPosition(0);
    panelPosition >= 0 ? setSwipeButton(styles.open) : setSwipeButton(styles.close);
  }
    
  function movePanelWithModes() {
    modesPanelHeight <= 0 ? setModesPanelHeight(135) : setModesPanelHeight(0);
  }

  return (
    <div className={styles.body} style={{left: panelPosition}}>
      <h1 className={styles.title}>DEVELOPER MENU</h1>

      <span className={styles.modeTitle}>Mode</span>
      <input
        value={DevStore.modeProject}
        className={styles.currentMode}
        type="button"
        onClick={() => movePanelWithModes()}
      />
      <div className={styles.modesPanel} style={{height: modesPanelHeight}}>
        <input 
          value="Development"
          className={styles.modeButton}
          type="button"
          onClick={() => { DevStore.setDev(); movePanelWithModes(); }}
        />
        <input 
          value="Production"
          className={styles.modeButton}
          type="button"
          onClick={() => { DevStore.setProd(); movePanelWithModes(); }}
        />
        <input 
          value="Test"
          className={styles.modeButton}
          type="button"
          onClick={() => { DevStore.setTest(); movePanelWithModes(); }}
        />
      </div>

      <input
        type="button"
        className={`${styles.swipeButton} ${swipeButton}`}
        onClick={() => changeMode()}
      />  
    </div>
  );
})

export default RetractablePanel;
