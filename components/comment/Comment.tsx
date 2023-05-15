import Image from "next/image";
import styles from "./styles/comment.module.sass";
import arrowTop from "images/arrow-top.svg";
import avatar from 'images/avatar.svg';
import arrowBottom from "images/arrow-bottom.svg";
import { useSelector } from "react-redux";
import { IComment } from "types/Post";

interface CommentObj {
    comment: IComment;
    disabled?: boolean;
}
export default function Comment({comment, disabled=false}:CommentObj) {
    const user = useSelector((state: any) => state.user);
    let isUser = user.id !== -1;
    if(disabled) isUser = false;

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
        <div className={styles.comment} key={comment.id}>
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
                    <div className={styles.commentLeft}>
                        <Image
                        src={avatar}
                        alt="Аватар"
                        />
                        <p>{comment.id}</p>
                    </div>
                    <div className="commentRight">{comment.createdAt.toString()}</div>
                </div>
                <div className="commentcomment">{comment.body}</div>
            </div>
        </div>
    );
}