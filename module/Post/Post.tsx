import styles from "./styles/posts.module.sass";
import Image from "next/image";
import Link from "next/link";

import avatar from "images/avatar.svg";
import message from "images/message.svg";
import star from "images/star.svg";

export default function Post(props:any){
    const data = new Date(Date.parse(props.postData.createdAt))
    return (
        <div className={styles.post}>
            <div className={styles.postTop}>
                <div className={styles.postAuthor}>
                    <Link className={styles.postAuthor} href={`/users/${props.postData.userId}`} style={{ textDecoration: "none", color:"#fff" }}>
                        <Image src={avatar} alt="Аватар" />
                        <span className={styles.postAuthorname}>{props.postData.userId}</span>
                    </Link>
                </div>
                <div className={styles.postDate}>
                    {data.getDay() <= 9 ? "0"+data.getDay() : data.getDay()},&nbsp;
                    {data.getHours() <= 9 ? "0"+data.getHours() : data.getHours()}:{data.getMinutes() <= 9 ? "0"+data.getMinutes() : data.getMinutes()}</div>
            </div>
            <div className={styles.postMiddle}>
                <Link href={`/posts/${props.postData.id}`} style={{ textDecoration: "none", color:"#fff" }}>
                    <div className={styles.postTitle}>{props.postData.title}</div>
                </Link>
                <div className={styles.postBody}>{props.postData.body}</div>  
            </div>
            <div className={styles.postBottom}>
                <div className={styles.postComments}>
                    <Image src={message} alt="Іконка повідомлень" />
                    <span className={styles.postCommentsCount}>12</span>
                </div>
                <div className={styles.postRank}
                    style={{color: props.postData.rank > 0 ? "#6AEA3D" : "#F36A6A"}}>
                    <Image
                        src={star}
                        alt="Зіронька, репутація"
                    />
                    <span className={styles.postRankCount}>{props.postData.rank}</span>
                </div>
            </div>
        </div>
    )
}