import styles from '../styles/posts.module.sass'

const avatar = require('../images/avatar.svg')
const message = require('../images/message.svg')

export default function Post(props:any){
  const data = props.postData.createdAt
  return (
    <div className={styles["post"]}>
      <div className={styles["post__top"]}>
        <div className={styles["post__author"]}>
          <img src={avatar.default.src}/>
          <span className={styles["post__authorname"]}>{props.postData.userId}</span>
        </div>
        <div className={styles["post__date"]}>
          {data.getDay() <= 9 ? '0'+data.getDay() : data.getDay()},&nbsp;
          {data.getHours() <= 9 ? '0'+data.getHours() : data.getHours()}:{data.getMinutes() <= 9 ? '0'+data.getMinutes() : data.getMinutes()}</div>
      </div>
      <div className={styles["post__middle"]}>
        <div className={styles["post__title"]}>{props.postData.title}</div>
        <div className={styles["post__body"]}>{props.postData.body}</div>  
      </div>
      <div className={styles["post__bottom"]}>
        <div className={styles["post__comments"]}>
          <img src={message.default.src}/>
          <span className={styles['post__commentscount']}>12</span>
          </div>
        <div className={styles["post__rank"]}
        style={{color: props.postData.rank > 0 ? "green" : "red"}}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
            d="M1.18782 10.933L6.5 7.86602V14H7.5V7.86603L12.8122 10.933L13.3122 10.067L8 7L13.3122 3.93301L12.8122 3.06699L7.5 6.13397V0H6.5V6.13398L1.18782 3.06699L0.687824 3.93301L6 7L0.68782 10.067L1.18782 10.933Z"
            fill={props.postData.rank > 0 ? "#6AEA3D" : "#F36A6A"}/>
          </svg>
          <span className={styles['post__rankcount']}>{props.postData.rank}</span>
          </div>
      </div>
    </div>
  )
}