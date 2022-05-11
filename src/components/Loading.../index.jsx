import { observer } from "mobx-react-lite";
import dappState from "../../store/dappState";
import styles from "./styles.module.css";

export default observer(function Loading(props) {
  return dappState.display ? (
    <p className={styles.loading}>{dappState.state}</p>
  ) : null;
});
