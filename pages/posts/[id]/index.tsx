import Image from "next/image"
import styles from "./post.module.sass"
import prisma from "@database"
import { GetServerSideProps } from "next"
import AsideProfile from "module/Aside/AsideProfile"
import arrowTop from "images/arrow-top.svg"
import arrowBottom from "images/arrow-bottom.svg"
import SimilarPosts from "module/Aside/SimilarPosts"

export default function Post({postContent, postComments, author}:any) {

    return (
        <div className={styles.main}>
            <div className={styles.post}>
                <h1 className={styles.title}>{postContent.title}</h1>

                <div className={styles.content}>{postContent.body}</div>

                <div className={styles.comments}>
                    <div className="comments">
                        <div className={styles.commentsTitle}>
                            <svg width="20" height="18" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 11.6892L6.99927 11.6892C6.3492 11.6901 5.70183 11.6062 5.07375 11.4395L4.88986 11.3907L4.72004 11.4765C4.29618 11.6906 3.32138 12.1086 1.68953 12.4186C1.93962 11.7289 2.14798 10.9133 2.22146 10.1474L2.24401 9.91234L2.07685 9.7456C1.0866 8.75785 0.5 7.47976 0.5 6.09459C0.5 3.06758 3.3431 0.5 7 0.5C10.6569 0.5 13.5 3.06758 13.5 6.09459C13.5 9.1216 10.6569 11.6892 7 11.6892Z" stroke="white"/>
                            </svg>
                            <span className={styles.commentsTitleText}>
                Коментарі - {postComments.length}
                            </span>
                        </div>
                        <div className={styles.commentsList}>
                            {
                                postComments.map((e:any) => {
                                    return (
                                        <div key={e.id} className={styles.comment}>
                                            <div className={styles.rank}>
                                                <Image
                                                    src={arrowTop}
                                                    alt="Збільшити репутацію"
                                                />
                                                <div
                                                    className={styles.rankCount}
                                                    style={{ color: e.rank > 0 ? "#6AEA3D" :
                                                        e.rank == 0 ? "gray" : "#F36A6A"}}>
                                                    {e.rank}
                                                </div>
                                                <Image
                                                    src={arrowBottom}
                                                    alt="Зменшити репутацію"
                                                />
                                            </div>
                                            <div className={styles.commentContent}>
                                                <div className={styles.commentTop}>
                                                    <div className="commentLeft">{e.id}</div>
                                                    <div className="commentRight">{e.createdAt}</div>
                                                </div>
                                                <div className="commentBody">{e.body}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className="aside">
                <AsideProfile userName={author.name} userId={author.id}/>
                <SimilarPosts/>
            </div>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (context) => {

    const id = Number(context.query.id)
    const post = await prisma.post.getPostById(id)
    const postParsed = JSON.parse(JSON.stringify(post))

    let comments:Array<any>= await prisma.post.getPostComments(id)
    comments = comments.sort((a:any,b:any) => {
        if(a.createdAt < b.createdAt) return +1
        return -1
    })

    const commentsPreparing = comments.map(e => {
        e.createdAt = `${e.createdAt.getDate() > 9 ?
            e.createdAt.getDate() : "0"+e.createdAt.getDate()}.
      ${e.createdAt.getMonth() > 9 ? e.createdAt.getMonth() : "0"+e.createdAt.getMonth()}.
      ${e.createdAt.getFullYear().toString().slice(2)} у 
      ${e.createdAt.getHours() > 9 ? e.createdAt.getHours() :
        "0"+e.createdAt.getHours()}:${e.createdAt.getMinutes() > 9 ? e.createdAt.getMinutes() : "0"+e.createdAt.getMinutes()}`
        return e
    })
    const commentsParsed = JSON.parse(JSON.stringify(commentsPreparing))

    const author = await prisma.user.getUserById(postParsed.userId)
    const authorParsed = JSON.parse(JSON.stringify(author))

    return {
        props: {
            postContent: postParsed,
            postComments: commentsParsed,
            author: authorParsed
        }
    }
}