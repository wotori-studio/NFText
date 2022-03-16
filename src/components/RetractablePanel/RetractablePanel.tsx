import styles from "./RetractablePanel.module.sass";

import { useState } from "react";
import { observer } from "mobx-react-lite";

import DevStore from "./../../store/devStore";

const RetractablePanel = observer(() => {
  const [panelPosition, setPanelPosition] = useState(-250);
  const [modesPanelHeight, setModesPanelHeight] = useState(0)
  const [arrowDeg, setArrowDeg] = useState("polygon(32% 50%, 64% 98%, 50% 100%, 10% 50%, 50% 0%, 64% 12%)")

  function changeMode() {
    panelPosition >= 0 ? setPanelPosition(-250) : setPanelPosition(0);
    panelPosition >= 0 
      ? setArrowDeg("polygon(68% 50%, 36% 12%, 50% 0, 90% 50%, 50% 100%, 36% 88%)")
      : setArrowDeg("polygon(32% 50%, 64% 98%, 50% 100%, 10% 50%, 50% 0%, 64% 12%)");
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
        className={styles.selectBTN}
        type="button"
        onClick={() => movePanelWithModes()}
      />
      <div className={styles.selectModes} style={{height: modesPanelHeight}}>
        <input 
          value="Development"
          className={styles.modeBTN}
          type="button"
          onClick={() => DevStore.setDev()}
        />
        <input 
          value="Production"
          className={styles.modeBTN}
          type="button"
          onClick={() => DevStore.setProd()}
        />
        <input 
          value="Test"
          className={styles.modeBTN}
          type="button"
          onClick={() => DevStore.setTest()}
        />
      </div>

      <input
        type="button"
        className={styles.swipeButton}
        style={{clipPath: arrowDeg}}
        onClick={() => changeMode()}
      />  
    </div>
  );
})

export default RetractablePanel;
