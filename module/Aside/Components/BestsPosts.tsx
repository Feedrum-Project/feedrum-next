import styles from "../styles/aside.module.sass";
import message from "images/message.svg";
import star from "images/star.svg";
import starG from "images/star-green.svg";
import starR from "images/star-red.svg";
import Image from "next/image";
import { IPost } from "types/Post";
import Star from "components/UI/Star/Star";

export default function BestPosts({ posts }: { posts: IPost[] }) {
    const parse = posts.map((e) => (
        <div key={e.id}>
            <div className="title">{e.title}</div>
            <div className={styles.elemBottom}>
                <div className={styles.elemComments}>
                    <Image src={message} alt="Повідомлення" />
                    <span className={styles.elemCommentsCount}>
                        {e._count?.Comments}
                    </span>
                </div>
                <div className={styles.elemRank}>
                    <Star reputation={e.rank} />
                </div>
            </div>
        </div>
    ));

    return (
        <div className={styles.elem}>
            <div className={styles.elemTitle}>Найкращі пости тижня</div>
            <div className={styles.elemBody}>{parse}</div>
        </div>
    );
}
