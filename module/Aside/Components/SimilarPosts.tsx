import Image from "next/image";
import styles from "../styles/aside.module.sass";
import comments from "images/message.svg";
import starG from "images/star-green.svg";

export default function SimilarPosts() {
  return (
    <div className={[styles.elem, styles.asideSimilar].join(" ")}>
      <div className={styles.elemTitle}>Схожі статті</div>
      <div className={styles.articles}>
        <div className={styles.article}>
          <div className={styles.articleTitle}>
            Скільки років мовам программування?
          </div>
          <div className={styles.articleBottom}>
            <div className={styles.articleComments}>
              <Image src={comments} alt="коментарі" /> 12
            </div>
            <div className={styles.articleReputation}>
              <Image src={starG} alt="репутація" /> 34
            </div>
          </div>
        </div>
        <div className={styles.article}>
          <div className={styles.articleTitle}>
            Чому твій портфоліо нікому не цікавий
          </div>
          <div className={styles.articleBottom}>
            <div className={styles.articleComments}>
              <Image src={comments} alt="коментарі" /> 12
            </div>
            <div className={styles.articleReputation}>
              <Image src={starG} alt="репутація" /> 34
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
