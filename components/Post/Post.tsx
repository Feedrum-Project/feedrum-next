import styles from "./styles/posts.module.sass";
import Image from "next/image";
import Link from "next/link";

import avatar from "images/avatar.svg";
import message from "images/message.svg";

import { IPost } from "types/Post";
import getRelative from "helpers/time.helper";
import Star from "components/UI/Star/Star";

export default function Post({ postData }: { postData: IPost }) {

  if(!postData.User) return <h1>Не знайдено користувача</h1>;
  return (
    <div className={styles.post}>
      <div className={styles.postTop}>
        <div className={styles.postAuthor}>
          <Image src={avatar} alt="Аватар" />
          <span className={styles.postAuthorname}>
            <Link
              className={styles.postAuthor}
              href={`/users/${postData.User.id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <span className="name">{postData.User.name}</span>
              <span
                className={[
                  styles.postAuthorRank,
                  postData.User.rank > 0
                    ? "green"
                    : postData.User.rank < 0
                    ? "red"
                    : "gray"
                ].join(" ")}
              >
                (
                {postData.User.rank > 0
                  ? "+"
                  : ""}
                {postData.User.rank})
              </span>
            </Link>
          </span>
        </div>
        <div className={styles.postDate}>
          {getRelative(new Date(postData.createdAt))}
        </div>
      </div>
      <div className={styles.postMiddle}>
        <h1 className={styles.postTitle}>
          <Link
            href={`/posts/${postData.id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            {postData.title}
          </Link>
        </h1>
        <div className={styles.postBody}>
          {postData.body.length >= 234
            ? postData.body.slice(0, 234) + "...."
            : postData.body}
        </div>
      </div>
      <div className={styles.postBottom}>
        <div className={styles.postComments}>
          <Image src={message} alt="Іконка повідомлень" />
          <span className={styles.postCommentsCount}>
            {postData._count ? postData._count.Comments : 0}
          </span>
        </div>
        <div className={styles.postRank}>
          <Star reputation={postData.rank} />
        </div>
      </div>
    </div>
  );
}
