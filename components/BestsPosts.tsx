import styles from '../styles/aside.module.sass'

export default function AsideElement() {

  const bestPosts = [
    {id:1, title:"Скільки років мовам програмування?", comments:12, rank:5},
    {id:2, title:"Чому твій портфоліо нікому не цікавий", comments:12, rank:5}
  ]
  
  const parse = bestPosts.map(e => (
    <div key={e.id}>
      <div className="title">
        {e.title}
      </div>
      <div className={styles["elem__bottom"]}>
        <div className={styles["elem__comments"]}>
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11.6892L6.99927 11.6892C6.3492 11.6901 5.70183 11.6062 5.07375 11.4395L4.88986 11.3907L4.72004 11.4765C4.29618 11.6906 3.32138 12.1086 1.68953 12.4186C1.93962 11.7289 2.14798 10.9133 2.22146 10.1474L2.24401 9.91234L2.07685 9.7456C1.0866 8.75785 0.5 7.47976 0.5 6.09459C0.5 3.06758 3.3431 0.5 7 0.5C10.6569 0.5 13.5 3.06758 13.5 6.09459C13.5 9.1216 10.6569 11.6892 7 11.6892Z" stroke="white"/>
          </svg>
          <span className={styles["elem__commentsCount"]}>{e.comments}</span>
          </div>
        <div className={styles["elem__rank"]}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.18782 10.933L6.5 7.86602V14H7.5V7.86603L12.8122 10.933L13.3122 10.067L8 7L13.3122 3.93301L12.8122 3.06699L7.5 6.13397V0H6.5V6.13398L1.18782 3.06699L0.687824 3.93301L6 7L0.68782 10.067L1.18782 10.933Z" fill="#6AEA3D"/>
          </svg>
          <span className={styles["elem__rankCount"]}>{e.rank}</span>
        </div>
      </div>
    </div>
  ))

  return (
    <div className={styles["elem"]}>
      <div className={styles["elem__title"]}>Найкращі пости тижня</div>
        <div className={styles["elem__body"]}>
          {parse}
        </div>
      </div>
  )
}