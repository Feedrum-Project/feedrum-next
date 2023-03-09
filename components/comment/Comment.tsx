import Image from "next/image";
import styles from "./comment.module.sass";
import arrowTop from "images/arrow-top.svg";
import arrowBottom from "images/arrow-bottom.svg";

interface CommentObj {
    comment: {
        id: number
        rank: number
        createdAt: any
        body: string

    }
}
export default function Comment({comment}:CommentObj) {
    return (
        <>
            <div className={styles.rank}>
                <Image
                    src={arrowTop}
                    alt="Збільшити репутацію"
                />
                <div
                    className={styles.rankCount}
                    style={{ color: comment.rank > 0 ? "#6AEA3D" :
                        comment.rank == 0 ? "gray" : "#F36A6A"}}>
                    {comment.rank}
                </div>
                <Image
                    src={arrowBottom}
                    alt="Зменшити репутацію"
                />
            </div>
            <div className={styles.commentContent}>
                <div className={styles.commentTop}>
                    <div className="commentLeft">{comment.id}</div>
                    <div className="commentRight">{comment.createdAt}</div>
                </div>
                <div className="commentcomment">{comment.body}</div>
            </div>
        </>
    );
}