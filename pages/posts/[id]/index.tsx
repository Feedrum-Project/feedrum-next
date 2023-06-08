import styles from "./post.module.sass";
import prisma from "@database";
import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import AsideProfile from "module/Aside/Components/AsideProfile";
import SimilarPosts from "module/Aside/Components/SimilarPosts";
import Rank from "module/Aside/Components/Rank";
import Comment from "components/comment/Comment";
import Textarea from "components/UI/Textarea/Textarea";
import { Button, Input } from "components/UI";
import Modal from "components/Modal/Modal";

import message from "images/message.svg";
import avatar from "images/avatar.svg";
import parser from "helpers/parsers.helper";
import { IComment, IPost } from "types/Post";
import { IUser } from "types/User";
import { useSelector } from "react-redux";
import Link from "next/link";

interface IPostPage {
    postComments: IComment[];
    postContent: IPost;
    author: IUser;
}

export default function Post({postContent, postComments, author}:IPostPage) {

    const user = useSelector((state: {user: IUser}) => state.user);
    const [attention, setAttention] = useState<{code: number, message: string} | null   >(null);
    const [modal, setModal] = useState<{show: boolean, content: any}>({show: false, content: ""});

    let content = useRef<null | HTMLDivElement>(null);

    function sub(e: FormEvent) {
        e.preventDefault();
        const target = e.target as EventTarget & { comment: HTMLInputElement};
        const body = JSON.stringify({
            body: target.comment.value,
            postId: postContent.id
        });
        
        fetch("/api/comments", {
            method:"POST",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(e => {
                console.log(e);
                setAttention(e);
            });
    }
    
    function onSubmit(event: FormEvent) {
        event.preventDefault();

        const target = event.target as typeof event.target & {password: HTMLInputElement};
        
        const {email} = user;
        const body = JSON.stringify({
            postId: postContent.id,
            email,
            password: target.password.value
        });
        
        fetch("/api/posts", {
            method: "DELETE",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res);
            });

    }

    useEffect(() => {
        const post_content = parser.MDtoHTML(postContent.body+"\n", false);
        if(content && content.current) {
            content.current.innerHTML = post_content;
        }
    },[postContent.body]);

    if(author.id === -1) return <h1 style={{color:"#eee"}}>Статті не було знайдено</h1>;
    return (
        <div className={styles.main}>
            {
                modal.show && modal.content !== undefined ?
                    <Modal setModal={setModal}>
                        {modal.content}
                    </Modal>
                    : null
            }
            <div className={styles.post}>
                {
                    user.id === postContent.userId ?
                        <div className={styles.author}>
                            <Button
                                Style="purple"
                                to={"./"+postContent.id+"/edit"}
                            >
                                    Редагувати
                            </Button>
                            <Button
                                Style="red"
                                onClick={
                                    () => {
                                        setModal(
                                            {
                                                show: true, content: <>
                                                    <form method="post" className={styles.window} onSubmit={onSubmit}>
                                                        <h1 className={styles.headtext}>Видалити пост?</h1>
                                                        <p className={styles.subtext}>Ця дія не відворотня, може хочете просто <Link className={styles.link} href={"./"+postContent.id+"/edit"}>редагувати</Link>?</p>
                                                        <Input Name="Пароль" name="password" type="password" autoComplete={false} placeholder="Пароль вашого облікового запису"/>
                                                        <Button Style="red" type="submit">Видалити</Button>
                                                    </form>
                                                </>
                                            }
                                        );
                                    }
                                }
                            >
                                Видалити
                            </Button>
                        </div>
                        : null
                }
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
                        <h2
                            style={
                                {color: attention && attention.code !== 200 ? "#F36A6A" : "#6AEA3D"}
                            }>
                            { attention ? attention.message : null}
                        </h2>
                        <form onSubmit={sub} className={styles.comment}>
                            <div className={styles.commentLeft}>
                                <Image alt="Аватар" src={avatar} width={40} height={40}/>
                            </div>
                            <div className={styles.commentRight}>
                                <Textarea Name="Коментар" name="comment" maxCount={2048}/>
                            </div>
                        </form>
                        <div className={styles.commentsList}>
                            {
                                postComments.map((e:IComment) => {
                                    return (
                                        <Comment
                                            key={e.id}
                                            comment={e}
                                            disabled={e.userId === user.id}/>
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
                <div style={{width: "fit-content"}}>
                    <Rank info={postContent} disabled={user.id === postContent.userId}/>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps:GetServerSideProps = async (context) => {

    const id = Number(context.query.id);
    const post: IPost | null = await prisma.post.getPostById(id);
    const postParsed = JSON.parse(JSON.stringify(post));

    let comments: IComment[] = await prisma.post.getPostComments(id);

    comments = comments.sort((a: IComment,b: IComment) => {
        if(new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()) return 1;
        return -1;
    });

    const commentsPreparing = comments.map(e => {
        typeof e.createdAt === "string" ? null :
            e.createdAt = `${e.createdAt.getDate() > 9 ?
                e.createdAt.getDate() : "0"+e.createdAt.getDate()}.${e.createdAt.getMonth() > 9 ? e.createdAt.getMonth() : "0"+e.createdAt.getMonth()}.${e.createdAt.getFullYear().toString().slice(2)} у 
        ${e.createdAt.getHours() > 9 ? e.createdAt.getHours() :
        "0"+e.createdAt.getHours()}:${e.createdAt.getMinutes() > 9 ? e.createdAt.getMinutes() : "0"+e.createdAt.getMinutes()}`;
        return e;
    });
    const commentsParsed = JSON.parse(JSON.stringify(commentsPreparing));

    if(postParsed === null) {
        return {
            props: {
                postContent: {
                    body: "We haven't been found it"
                },
                postComments: 0,
                author: {id: -1}
            }
        };
    }
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