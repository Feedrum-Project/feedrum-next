import Image from "next/image";
import styles from "./styles/comment.module.sass";
import arrowTop from "images/arrow-top.svg";
import avatar from "images/avatar.svg";
import arrowBottom from "images/arrow-bottom.svg";
import { useDispatch, useSelector } from "react-redux";
import { IComment } from "types/Post";
import getRelative from "helpers/time.helper";
import Link from "next/link";
import { IStore } from "store/store";

interface CommentObj {
  comment: IComment;
  disabled?: boolean;
  postInfo?: boolean;
}
/**
 * Comment commponent.
 *
 * @example
 * // Usage:
 * <Comment comment={comment} disabled={false}/>
 */
export default function Comment({
  comment,
  disabled = false,
  postInfo = false
}: CommentObj) {
  const { user } = useSelector((state: IStore) => state).user;
  const dispatch = useDispatch();

  let isUser = user !== null ? user.id !== -1 : false;
  if (disabled) isUser = false;

  function Vote(vote: "UPVOTE" | "DOWNVOTE") {
    const body = {
      ...comment,
      score: vote
    };

    fetch("/api/comments/" + comment.id + "/vote", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((e) =>
        e.code === 200
          ? dispatch({
              type: "addNotification",
              payload: {
                type: "good",
                title: "Зацінено",
                text: "Ви поставили оцінку коментарю."
              }
            })
          : dispatch({
              type: "addNotification",
              payload: {
                type: "bad",
                title: "На зацінено",
                text: "Оцінку не схвалено ;("
              }
            })
      );
  }

  return (
    <div className={styles.comment}>
      {postInfo ? (
        <div className={styles.post}>
          <div className={styles.postName}>
            <Link href={"/posts/" + comment.Post.id}>{comment.Post.title}</Link>
          </div>
          <div className={styles.postAuthor}>
            <Image src={avatar} alt="avatar" />
            {comment.Post.User ? (
              <span id="user">
                <Link href={"/users/" + comment.Post.User.id}>
                  <span id="name">{comment.Post.User.name} </span>
                  <span
                    id="rank"
                    className={
                      comment.Post.User.rank > 0
                        ? "green"
                        : comment.Post.User.rank < 0
                        ? "red"
                        : "gray"
                    }
                  >
                    ({comment.Post.User.rank})
                  </span>
                </Link>
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className={styles.commentBody}>
        <div className={styles.rank}>
          <button disabled={!isUser} onClick={() => Vote("UPVOTE")} className={styles.growRep}>
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
                  : "#F36A6A"
            }}
          >
            {comment.rank}
          </div>
          <button disabled={!isUser} onClick={() => Vote("DOWNVOTE")} className={styles.decreaseRep}>
            <Image src={arrowBottom} alt="Зменшити репутацію" />
          </button>
        </div>
        <div className={styles.commentContent}>
          <div className={styles.commentTop}>
            <div className={styles.commentLeft}>
              <Image src={avatar} alt="Аватар" />
              <Link href={"/users/" + comment.User.id}>
                <span className={styles.userName}>{comment.User.name}</span>
                <span
                  className={
                    comment.User.rank > 0
                      ? "green"
                      : comment.User.rank < 0
                      ? "red"
                      : "gray"
                  }
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
    </div>
  );
}
