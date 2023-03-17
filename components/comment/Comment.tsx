import Image from "next/image";
import styles from "./comment.module.sass";
import arrowTop from "images/arrow-top.svg";
import arrowBottom from "images/arrow-bottom.svg";
import { useSelector } from "react-redux";

interface CommentObj {
    comment: {
        id: number
        rank: number
        createdAt: any
        body: string

    }
}
export default function Comment({comment}:CommentObj) {
    const user = useSelector((state: any) => state.user);
    const isUser = user.id !== -1;

    function Vote(vote:"UPVOTE" | "DOWNVOTE") {
        const body = {
            ...comment,
            score: vote
        };
        
        fetch("http://localhost:3000/api/comments/" + comment.id + "/vote", {
            method:"POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(e => console.log(e));
    }

    return (
        <>
            <div className={styles.rank}>
                <button disabled={!isUser} onClick={() => Vote("UPVOTE")}>
                    <Image
                        src={arrowTop}
                        alt="Збільшити репутацію"
                    />
                </button>
                <div
                    className={styles.rankCount}
                    style={{ color: comment.rank > 0 ? "#6AEA3D" :
                        comment.rank == 0 ? "gray" : "#F36A6A"}}>
                    {comment.rank}
                </div>
                <button disabled={!isUser} onClick={() => Vote("DOWNVOTE")}>
                    <Image
                        src={arrowBottom}
                        alt="Зменшити репутацію"
                    />
                </button>
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