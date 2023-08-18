import Image from "next/image";
import styles from "./styles/comment.module.sass";
import arrowTop from "images/arrow-top.svg";
import avatar from "images/avatar.svg";
import arrowBottom from "images/arrow-bottom.svg";
import { useSelector } from "react-redux";
import { IComment } from "types/Post";
import getRelative from "helpers/time.helper";
import Link from "next/link";
import { IStore } from "store/store";

interface CommentObj {
    comment: IComment;
    disabled?: boolean;
}
export default function Comment({ comment, disabled = false }: CommentObj) {
    const { user } = useSelector((state: IStore) => state).user;

    let isUser = user !== null ? user.id !== -1 : false;
    if (disabled) isUser = false;

    function Vote(vote: "UPVOTE" | "DOWNVOTE") {
        const body = {
            ...comment,
            score: vote,
        };

        fetch("http://localhost:3000/api/comments/" + comment.id + "/vote", {
            method: "POST",
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((e) => console.log(e));
    }

    return (
        <div className={styles.comment} key={comment.id}>
            <div className={styles.rank}>
                <button disabled={!isUser} onClick={() => Vote("UPVOTE")}>
                    <Image src={arrowTop} alt="Збільшити репутацію" />
                </button>
                <div
                    className={styles.rankCount}
                    style={{
                        color:
                            comment.rank > 0
                                ? "#6AEA3D"
                                : comment.rank == 0
                                    ? "gray"
                                    : "#F36A6A",
                    }}
                >
                    {comment.rank}
                </div>
                <button disabled={!isUser} onClick={() => Vote("DOWNVOTE")}>
                    <Image src={arrowBottom} alt="Зменшити репутацію" />
                </button>
            </div>
            <div className={styles.commentContent}>
                <div className={styles.commentTop}>
                    <div className={styles.commentLeft}>
                        <Image src={avatar} alt="Аватар" />
                        <Link href={"/users/" + comment.User.id}>
                            <span className={styles.userName}>
                                {comment.User.name}
                            </span>
                            <span
                                className={[
                                    "userRank",
                                    comment.User.rank > 0
                                        ? "green"
                                        : comment.User.rank < 0
                                            ? "red"
                                            : "gray",
                                ].join(" ")}
                            >
                                ({comment.User.rank > 0 ? "+" : null}
                                {comment.User.rank})
                            </span>
                        </Link>
                    </div>
                    <div className="commentRight">
                        {getRelative(new Date(comment.createdAt))}
                    </div>
                </div>
                <div className="commentcomment">{comment.body}</div>
            </div>
        </div>
    );
}
