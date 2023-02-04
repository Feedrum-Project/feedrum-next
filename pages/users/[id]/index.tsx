import prisma from "@database"
import { GetServerSideProps } from "next"
import Image from "next/image"
import Link from "next/link"
import Button from "components/Button/Button"
import Rank from "components/Aside/Rank"
import avatar from "images/avatar.svg"
import styles from "./profile.module.sass"
import message from "images/message.svg"
import star from "images/star.svg"

interface UserProps {
  userInformation: {
    id:number,
    name:string,
    rank:number,
    createdAt:string,
    isVerified:boolean
  },
  userPosts: {
    id:number,
    body:string,
    title:string,
    rank:number,
    createdAt:string,
    userId:number
  }[]
}

export default function User({userInformation, userPosts}:UserProps) {
    return (
        <div className={styles.main}>
            <div className={styles.profile}>
                <div className={styles.profileTop}>
                    <div className={styles.name}>
                        <Image width="41" height="41" src={avatar} alt="Аватар"/>
                        <span className={styles.nameNick}>{userInformation.name}</span>
                    </div>
                    <div className={styles.profileAside}>
                        <Button Style="purple">Підписатися</Button>
                        <Rank userRank={userInformation.rank}></Rank>
                    </div>
                </div>
                <div className={styles.sort}>
                    <div className="post">Пости</div>
                    <div className={styles.comments}>Коментарі</div>
                </div>
                <div className={styles.profileContent}>
                    {
                        userPosts.map((e:any) => {
                            return (
                                <div key={e.id} className={styles.post}>
                                    <div className={styles.postTime}>{e.createdAt}</div>
                                    <div className={styles.postContent}>
                                        <Link href={`/posts/${e.id}`} key={e.id} style={{textDecoration: "none", color:"white"}}>
                                            <div className={styles.postTitle}>{e.title}</div>
                                        </Link>
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
                            )
                        })
                    }
                </div>
            </div>
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