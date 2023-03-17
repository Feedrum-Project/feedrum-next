import styles from "../styles/rank.module.sass";
import Image from "next/image";
import arrowTop from "images/arrow-top.svg";
import arrowBottom from "images/arrow-bottom.svg";

interface RankProps {
  rank:number
}

export default function Rank({rank=0}:RankProps) {
    return (
        <div className={styles.rank}>
            <button className={styles.growReputation}>
                <Image src={arrowTop} alt="Підняти репутацію"/>
            </button>
            <div
                className="rankCount"
                style={{color: rank > 0 ? "#6AEA3D" : rank < 0 ? "#F36A6A" : "#BEBEBE"}}
            >
                {rank > 0 ? "+" : null}{rank}
            </div>
            <button className={styles.reduceReputation}>
                <Image src={arrowBottom} alt="Знизити репутацію"/>
            </button>
        </div>
    );
}