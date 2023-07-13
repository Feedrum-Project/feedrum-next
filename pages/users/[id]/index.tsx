import prisma from "@database";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Button from "components/UI/Button/Button";
import Rank from "module/Aside/Components/Rank";
import AsideInfo from "module/Aside/Components/AsideInfo";

import styles from "./profile.module.sass";

import message from "images/message.svg";
import avatar from "images/avatar.svg";
import star from "images/star.svg";
import starG from "images/star-green.svg";
import starR from "images/star-red.svg";
import arrowT from "images/arrow-top.svg";
import arrowB from "images/arrow-bottom.svg";

import { IUser } from "types/User";
import { IPost } from "types/Post";
import { Comment } from "@prisma/client";

interface UserProps {
  userInformation: IUser | null;
  userPosts: IPost[] | [];
  userComments: Comment[]
}

export default function User({userInformation, userPosts, userComments}:UserProps) {
    const user = useSelector((state: any) => state.user);

    const [sortPosts, setSortPosts] = useState<"new" | "best" | "popular">("new");
    const [type, setType] = useState<"posts" | "comments" | "subs">("posts");

    const dispatch = useDispatch();

    if(!userInformation) return (
        <div className={styles.main}>
            <h1>Користувача не знайдено!</h1>
        </div>
    );
    return (
        <>
            <div className={styles.main}>
                <div className={styles.profile}>
                    <div>
                        <div className={styles.name}>
                            <Image width="41" height="41" src={avatar} alt="Аватар"/>
                            <span className={styles.nameNick}>{userInformation.name}</span>
                        </div>
                    </div>
                    <div className={styles.profileContent}>
                        {
                            type === "posts" ?
                                !userPosts.length ?
                                    <div>
                                        <h1 style={{width:"20rem"}}>У&nbsp;користувача відсутні свої статті.</h1>
                                    </div>
                                    : <>
                                        <div className={styles.sort}>
                                            <button
                                                onClick={() => setSortPosts("new")}
                                                className={sortPosts === "new" ? styles.choosed : styles.unchoosed}
                                            >
                                                Найновіщі
                                            </button>
                                            <button
                                                onClick={() => setSortPosts("best")}
                                                className={sortPosts === "best" ? styles.choosed : styles.unchoosed}
                                            >
                                                Найкращі
                                            </button>
                                            <button
                                                onClick={() => setSortPosts("popular")}
                                                className={sortPosts === "popular" ? styles.choosed : styles.unchoosed}
                                            >
                                                Популярні
                                            </button>
                                        </div>
                                        {
                                            userPosts.map((e: any) => {
                                                return (
                                                    <div key={e.id} className={styles.post}>
                                                        <div className={styles.postTime}>
                                                            <span>{new Date(e.createdAt).toLocaleDateString("en-US")},&nbsp;</span>
                                                            <span>{new Date(e.createdAt).toLocaleTimeString("en-US")}</span>
                                                        </div>
                                                        <div className={styles.postContent}>
                                                            <div className={styles.postTitle}>
                                                                <Link href={`/posts/${e.id}`} key={e.id} style={{textDecoration: "none", color:"white"}}>
                                                                    {e.title}
                                                                </Link>
                                                            </div>
                                                            <div className={styles.postBody}>{e.body}</div>
                                                        </div>
                                                        <div className={styles.postBottom}>
                                                            <div className={styles.postComments}>
                                                                <Image width="14" height="13" src={message} alt="Повідомлення"/>
                                                                <span>6</span>
                                                            </div>
                                                            <div className={styles.postRank}>
                                                                <Image width="13" height="14" src={e.rank > 0 ? starG : e.rank === 0 ? star : starR} alt="Зірка"/>
                                                                <span
                                                                    className={e.rank > 0 ? "green" : e.rank < 0 ? "red" : "gray"}>
                                                                    {e.rank}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </>
                                : type === "comments" ? !userComments.length ?
                                    <h1 style={{width:"20rem"}}>У&nbsp;користувача відсутні свої коментарі.</h1>
                                    : <div style={{width: "100%"}}>
                                        {
                                            userComments.map(comment => {
                                                return <div key={comment.id} className={styles.comment}>
                                                    <div className={styles.commentPost}>
                                                        <span className={styles.commentPostName}>
                                                            Name of Post{comment.postId}
                                                        </span>
                                                        <div className={styles.commentPostAuthor}>
                                                            <Image
                                                                src={avatar}
                                                                alt="аватар"
                                                                width={18}
                                                            />
                                                            <span>
                                                                {comment.postId}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.commentBody}>
                                                        <div className={styles.commentRank}>
                                                            <Image src={arrowT} alt="Покращити репутацію"/>
                                                            <span>{comment.rank}</span>
                                                            <Image src={arrowB} alt="Погіршити репутацію"/>
                                                        </div>
                                                        <div className={styles.commentContent}>
                                                            <div className={styles.commentContentTop}>
                                                                <div className={styles.commentContentAuthor}>
                                                                    <Image
                                                                        src={avatar}
                                                                        alt="аватар"
                                                                        width={18}
                                                                    />
                                                                    {comment.userId}
                                                                </div>
                                                                <div className="commentDate">
                                                                    {comment.createdAt.toString()}
                                                                </div>
                                                            </div>
                                                            <div className="bodyContent">
                                                                {comment.body}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>;
                                            })
                                        }
                                    </div>
                                    : <div>
                                        <div className="list">
                                            <h1>Порожній список</h1>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
                <aside className={styles.aside}>
                    <div className={styles.profileAside}>
                        <Button Style="purple">Підписатися</Button>
                        <Rank
                            info={userInformation}
                            disabled={user.id === userInformation.id}/>
                    </div>
                    <div className={styles.type}>
                        <h1>Тип</h1>
                        <div className={styles.menu}>
                            <button
                                className={type === "posts" ? styles.selectedCategory : styles.unselectedCategory}
                                onClick={() => setType("posts")}
                            >
                                Пости
                            </button>
                            <button
                                className={type === "comments" ? styles.selectedCategory : styles.unselectedCategory}
                                onClick={() => setType("comments")}
                            >
                                Коментарі
                            </button>
                            <button
                                className={type === "subs" ? styles.selectedCategory : styles.unselectedCategory}
                                onClick={() => setType("subs")}
                            >
                                Підписки
                            </button>
                        </div>
                    </div>
                    <AsideInfo
                        organisation="Щось і Колись"
                        createdAt="23 серпня 2021"
                        country="Україна"
                        description="Житомир - це найкраще місце на усій планеті. Саме там я і народився"
                    />
                </aside>
            </div>
            {
                user.id && user.id === userInformation.id
                    ?
                    <Button
                        Style="purple"
                        onClick={() => {
                            document.cookie = "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                            dispatch({type: "set", payload: {id: -1}});
                        }}
                    >
                                Вийти з облікового запису
                    </Button>
                    : null
            }
        </>
    );
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const userInformation: IUser | null = await prisma.user.getUserById(Number(context.query.id));
    const userPosts: IPost[] | [] = await prisma.user.getUserPosts(Number(context.query.id));
    const userComments: Comment[] = await prisma.user.getUserComments(Number(context.query.id));

    return {
        props: {
            userInformation: JSON.parse(JSON.stringify(userInformation)),
            userPosts: JSON.parse(JSON.stringify(userPosts)),
            userComments: JSON.parse(JSON.stringify(userComments))
        }
    };
};