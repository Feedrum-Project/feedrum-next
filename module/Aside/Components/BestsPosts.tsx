import styles from "../styles/aside.module.sass";
import message from "images/message.svg";
import star from "images/star.svg";
import starG from "images/star-green.svg";
import starR from "images/star-red.svg";
import Image from "next/image";

export default function BestPosts() {

    const bestPosts = [
        {id:1, title:"Скільки років мовам програмування?", comments:12, rank:-2},
        {id:2, title:"Чому твій портфоліо нікому не цікавий", comments:12, rank:5}
    ];
  
    const parse = bestPosts.map(e => (
        <div key={e.id}>
            <div className="title">
                {e.title}
            </div>
            <div className={styles.elemBottom}>
                <div className={styles.elemComments}>
                    <Image src={message} alt="Повідомлення"/>
                    <span className={styles.elemCommentsCount}>{e.comments}</span>
                </div>
                <div className={styles.elemRank}>
                    <Image src={e.rank > 0 ? starG : e.rank === 0 ? star : starR} alt="Зіронька, репутація статті"/>
                    <span className={styles.elemRankCount} style={{color: e.rank > 0 ? "#6AEA3D" : e.rank === 0 ? "#BEBEBE" : "#F36A6A"}}>{e.rank}</span>
                </div>
            </div>
        </div>
    ));

    return (
        <div className={styles.elem}>
            <div className={styles.elemTitle}>Найкращі пости тижня</div>
            <div className={styles.elemBody}>
                {parse}
            </div>
        </div>
    );
}