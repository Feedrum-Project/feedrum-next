import styles from "../styles/aside.module.sass";
import message from "images/message.svg";
import Image from "next/image";
import { IPost } from "types/Post";
import Star from "components/UI/Star/Star";
import Link from "next/link";

export default function BestPosts({ posts }: { posts: IPost[] }) {
  const parsedPosts = posts.map((post) => (
    <div key={post.id}>
      <div className="title"><Link href={"/posts/"+post.id}>{post.title}</Link></div>
      <div className={styles.elemBottom}>
        <div className={styles.elemComments}>
          <Image src={message} alt="Повідомлення" />
          <span className={styles.elemCommentsCount}>{post._count?.Comments}</span>
        </div>
        <div className={styles.elemRank}>
          <Star reputation={post.rank} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.elem}>
      <div className={styles.elemTitle}>Найкращі пости тижня</div>
      <div className={styles.elemBody}>{parsedPosts}</div>
    </div>
  );
}
