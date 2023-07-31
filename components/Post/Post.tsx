import styles from "./styles/posts.module.sass";
import Image from "next/image";
import Link from "next/link";

import avatar from "images/avatar.svg";
import message from "images/message.svg";

import star from "images/star.svg";
import starG from "images/star-green.svg";
import starR from "images/star-red.svg";
import { IPost } from "types/Post";
import getRelative from "helpers/time.helper";

export default function Post({postData}: {postData: IPost}){
    return (
        <div className={styles.post}>
            <div className={styles.postTop}>
                <div className={styles.postAuthor}>
                    <Image src={avatar} alt="Аватар" />
                    <span className={styles.postAuthorname}>
                        <Link
                            className={styles.postAuthor}
                            href={`/users/${postData.User.id}`}
                            style={{ textDecoration: "none", color:"#fff" }}>
                            <span className="name">
                                {postData.User.name}
                            </span>
                            <span className={
                                [
                                    styles.postAuthorRank,
                                    postData.User.rank > 0 ?
                                        "green" : postData.User.rank < 0
                                            ? "red" : "gray"
                                ].join(" ")}>
                                (
                                {
                                    postData.User.rank > 0 ?
                                        "+" : postData.User.rank < 0
                                            ? "-" : ""
                                }
                                {postData.User.rank}
                                )
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
                    <Link href={`/posts/${postData.id}`} style={{ textDecoration: "none", color:"#fff" }}>
                        {postData.title}
                    </Link>
                </h1>
                <div className={styles.postBody}>{postData.body.length >= 234 ? postData.body.slice(0,234)+"...." : postData.body}</div>  
            </div>
            <div className={styles.postBottom}>
                <div className={styles.postComments}>
                    <Image src={message} alt="Іконка повідомлень" />
                    <span className={styles.postCommentsCount}>{postData._count!.Comments}</span>
                </div>
                <div className={styles.postRank}>
                    <Image
                        src={postData.rank > 0 ? starG : postData.rank === 0 ? star : starR}
                        alt="Зіронька, репутація"
                    />
                    <span
                        className={styles.postRankCount}
                        style={{color: postData.rank > 0 ? "#6AEA3D" : postData.rank === 0 ? "#BEBEBE" : "#F36A6A"}}
                    >{postData.rank}</span>
                </div>
            </div>
        </div>
    );
}