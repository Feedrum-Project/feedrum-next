import styles from "./post.module.sass";
import prisma from "@database";
import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useRef } from "react";

import Image from "next/image";
import AsideProfile from "module/Aside/Components/AsideProfile";
import SimilarPosts from "module/Aside/Components/SimilarPosts";
import Comment from "components/comment/Comment";
import { Button } from "components/UI";

import message from "images/message.svg";
import parser from "helpers/parsers.helper";
import { IComment, IPost } from "types/Post";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Post({postContent, postComments, author}:any) {
    const user = useSelector((state: any) => state.user);
    const [attention, setAttention] = useState<{code: number, message: string} | null   >(null);

    let content = useRef<null | HTMLDivElement>(null);

    function sub(e: FormEvent) {
        e.preventDefault();
        const target = e.target as EventTarget & { comment: HTMLInputElement};
        const body = {
            body: target.comment.value,
            postId: postContent.id
        };
        
        fetch("http://localhost:3000/api/comments", {
            method:"post",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(e => {
                console.log(e);
                setAttention(e);
            });
    }
    
    useEffect(() => {
        const post_content = parser.MDtoHTML(postContent.body+"\n", false);
        if(content && content.current) {
            content.current.innerHTML = post_content;
        }
    },[postContent.body]);

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
                            <div className={styles.comment}>
                                <form onSubmit={(e: FormEvent) => sub(e)}>
                                    <label>
                                        <h2>Залишити коментар</h2>
                                    </label>
                                    <br />
                                    <h2 style={{color: attention && attention.code !== 200 ? "#F36A6A" : "#6AEA3D"}}>{ attention ? attention.message : null}</h2>
                                    <textarea
                                        name="comment"
                                        placeholder="Зміст коментарю."
                                        style={
                                            {
                                                background:"#292929",
                                                color:"#fff",
                                                padding:".75rem",
                                                margin:"0 0 1rem 2.875rem",
                                                maxWidth:"17.25rem",
                                                minWidth:"17.25rem",
                                                maxHeight:"5.125rem",
                                                minHeight:"5.125rem"
                                            }
                                        }
                                    ></textarea>
                                    <br />
                                    <Button
                                        Style="purple"
                                        type="submit"
                                        style={{margin:"0 0 0 2.875rem"}}
                                    >
                                        Залишити
                                    </Button>
                                </form>
                            </div>
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