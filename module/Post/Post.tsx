import styles from "./styles/posts.module.sass";
import Image from "next/image";
import Link from "next/link";

import avatar from "images/avatar.svg";
import message from "images/message.svg";

import star from "images/star.svg";
import starG from "images/star-green.svg";
import starR from "images/star-red.svg";
import { IPost } from "types/Post";

export default function Post({postData}: {postData: IPost}){
    return (
        <div className={styles.post}>
            <div className={styles.postTop}>
                <div className={styles.postAuthor}>
                    <Link className={styles.postAuthor} href={`/users/${postData.userId}`} style={{ textDecoration: "none", color:"#fff" }}>
                        <Image src={avatar} alt="Аватар" />
                        <span className={styles.postAuthorname}>{postData.userId}</span>
                    </Link>
                </div>
                <div className={styles.postDate}>
                    {new Date(postData.createdAt).toLocaleDateString()},&nbsp;
                    {new Date(postData.createdAt).toLocaleTimeString()}
                </div>
            </div>
            <div className={styles.postMiddle}>
                <Link href={`/posts/${postData.id}`} style={{ textDecoration: "none", color:"#fff" }}>
                    <div className={styles.postTitle}>{postData.title}</div>
                </Link>
                <div className={styles.postBody}>{postData.body.length >= 234 ? postData.body.slice(0,234)+"...." : postData.body}</div>  
            </div>
            <div className={styles.postBottom}>
                <div className={styles.postComments}>
                    <Image src={message} alt="Іконка повідомлень" />
                    <span className={styles.postCommentsCount}>12</span>
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