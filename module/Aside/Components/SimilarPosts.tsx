import Image from "next/image";
import styles from "../styles/aside.module.sass";
import comments from "images/message.svg";
import starG from "images/star-green.svg";
import { lightPost } from "types/Post";
import Link from "next/link";

interface ISimilarPosts {
  posts: lightPost[];
}

export default function SimilarPosts({ posts }: ISimilarPosts) {
  return (
    <div className={[styles.elem, styles.asideSimilar].join(" ")}>
      <div className={styles.elemTitle}>Схожі статті</div>
      <div className={styles.articles}>
        {posts.map((post) => {
          return (
            <div className={styles.article} key={post.id}>
              <div className={styles.articleTitle}>
                <Link href={"/posts/" + post.id}>{post.title}</Link>
              </div>
              <div className={styles.articleBottom}>
                <div className={styles.articleComments}>
                  <Image src={comments} alt="коментарі" />{" "}
                  {post._count?.Comments}
                </div>
                <div className={styles.articleReputation}>
                  <Image src={starG} alt="репутація" /> {post.rank}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
