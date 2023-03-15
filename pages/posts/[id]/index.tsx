import styles from "./post.module.sass";
import prisma from "@database";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";

import Image from "next/image";
import AsideProfile from "module/Aside/Components/AsideProfile";
import SimilarPosts from "module/Aside/Components/SimilarPosts";
import Comment from "components/comment/Comment";
import message from "images/message.svg";
import parser from "helpers/parsers.helper";
import IPost, { IComment } from "types/Post";

export default function Post({postContent, postComments, author}:any) {


    let content = useRef<null | HTMLDivElement>(null);
    
    useEffect(() => {
        const post_content = parser.MDtoHTML(postContent.body+"\n");
        if(content && content.current) {
            content.current.innerHTML = post_content;
        }
    },[]);
    return (
        <div className={styles.main}>
            <div className={styles.post}>
                <h1 className={styles.title}>{postContent.title}</h1>

                <div className={styles.content} ref={content}></div>

                <div className={styles.comments}>
                    <div className="comments">
                        <div className={styles.commentsTitle}>
                            <Image src={message} alt="comment icon." width={20} height={18}/>
                            <span className={styles.commentsTitleText}>
                Коментарі - {postComments.length}
                            </span>
                        </div>
                        <div className={styles.commentsList}>
                            {
                                postComments.map((e:any) => {
                                    return (
                                        <div key={e.id} className={styles.comment}>
                                            <Comment comment={e}/>
                                        </div>
                                    );
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
    );
}

export const getServerSideProps:GetServerSideProps = async (context) => {

    const id = Number(context.query.id);
    const post: IPost | null = await prisma.post.getPostById(id);
    const postParsed = JSON.parse(JSON.stringify(post));

    let comments: IComment[] = await prisma.post.getPostComments(id);
    console.log(comments);
    comments = comments.sort((a:any,b:any) => {
        if(a.createdAt < b.createdAt) return +1;
        return -1;
    });

    const commentsPreparing = comments.map(e => {
        typeof e.createdAt === "string" ? null :
            e.createdAt = `${e.createdAt.getDate() > 9 ?
                e.createdAt.getDate() : "0"+e.createdAt.getDate()}.
        ${e.createdAt.getMonth() > 9 ? e.createdAt.getMonth() : "0"+e.createdAt.getMonth()}.
        ${e.createdAt.getFullYear().toString().slice(2)} у 
        ${e.createdAt.getHours() > 9 ? e.createdAt.getHours() :
        "0"+e.createdAt.getHours()}:${e.createdAt.getMinutes() > 9 ? e.createdAt.getMinutes() : "0"+e.createdAt.getMinutes()}`;
        return e;
    });
    const commentsParsed = JSON.parse(JSON.stringify(commentsPreparing));

    const author = await prisma.user.getUserById(postParsed.userId);
    const authorParsed = JSON.parse(JSON.stringify(author));

    return {
        props: {
            postContent: postParsed,
            postComments: commentsParsed,
            author: authorParsed
        }
    };
};