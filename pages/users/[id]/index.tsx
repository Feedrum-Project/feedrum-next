import prisma from "@database"
import { GetServerSideProps } from 'next'
import Image from "next/image"
import Link from "next/link"
import AsideUser from 'components/AsideUser'
import avatar from 'images/avatar.svg'
import styles from 'styles/profile.module.sass'
import message from 'images/message.svg'
import star from 'images/star.svg'

export default function User({userInformation, userPosts}:any) {
  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.name}>
          <Image width="41" height="41" src={avatar} alt="Аватар"/>
          <span className={styles.nameNick}>{userInformation.name}</span>
        </div>
        <div className={styles.sort}>
          <div className="post">Пости</div>
          <div className={styles.comments}>Коментарі</div>
        </div>
        <div className="content">
          {
            userPosts.map((e:any) => {
              return (
                <Link href={`/posts/${e.id}`} key={e.id} style={{textDecoration: 'none', color:'white'}}>
                  <div key={e.id} className={styles.post}>
                    <div className={styles.postTime}>{e.createdAt}</div>
                    <div className={styles.postContent}>
                      <div className={styles.postTitle}>{e.title}</div>
                      <div className={styles.postBody}>{e.body}</div>
                    </div>
                    <div className={styles.postBottom}>
                      <div className={styles.postComments}>
                        <Image width="14" height="13" src={message} alt="Повідомлення"/>
                        <span>6</span>
                        </div>
                      <div className={styles.postRank}>
                        <Image width="13" height="14" src={star} alt="Зірка"/>
                        <span
                        className={e.rank > 0 ? styles.green : e.rank < 0 ? styles.red : styles.gray}>
                          {e.rank}
                        </span>
                        </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
      <AsideUser/>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  const userPosts:any = await prisma.user.getUserPosts(Number(context.query.id))
  const userInformation:any = await prisma.user.getUserById(Number(context.query.id))

  return {
    props: {
      userInformation: JSON.parse(JSON.stringify(userInformation)),
      userPosts: JSON.parse(JSON.stringify(userPosts))
    }
  }
}