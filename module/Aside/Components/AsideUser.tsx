import styles from "../styles/aside.module.sass";
import { Button } from "../../../components/UI/index";
// import Rank from "./Rank";

interface AsideUserProps {
  userRank:number
}

export default function AsideUser({userRank}:AsideUserProps) {
    return (
        <div className={styles.asideUser}>
            <Button Style="purple">Підписатися</Button>
            {/* <Rank info={{rank: userRank}}/> */}
        </div>
    );
}