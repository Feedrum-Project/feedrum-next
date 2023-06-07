import prisma from "@database";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "components/UI/Button/Button";
import Rank from "module/Aside/Components/Rank";
import avatar from "images/avatar.svg";
import styles from "./profile.module.sass";
import message from "images/message.svg";
import AsideInfo from "module/Aside/Components/AsideInfo";

import star from "images/star.svg";
import starG from "images/star-green.svg";
import starR from "images/star-red.svg";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "types/User";
import { IPost } from "types/Post";
import { Post } from "@prisma/client";

interface UserProps {
  userInformation: IUser | null;
  userPosts: IPost[] | [];
}

export default function User({userInformation, userPosts}:UserProps) {
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    if(!userInformation) return (
        <div className={styles.main}>
            <h1>Користувача не знайдено!</h1>
        </div>
    )
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
                    <div className={styles.sort}>
                        <div className="post">Пости</div>
                        <div className={styles.comments}>Коментарі</div>
                    </div>
                    <div className={styles.profileContent}>
                        {
                            !userPosts.length ?
                                <div>
                                    <h1 style={{width:"20rem"}}>У&nbsp;користувача відсутні свої статті.</h1>
                                </div>
                                : userPosts.map((e: any) => {
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
                                                        className={e.rank > 0 ? styles.green : e.rank < 0 ? styles.red : styles.gray}>
                                                        {e.rank}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
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
    const userPosts: Post[] | [] = await prisma.user.getUserPosts(Number(context.query.id));
    const userInformation: IUser | null = await prisma.user.getUserById(Number(context.query.id));

    return {
        props: {
            userInformation: JSON.parse(JSON.stringify(userInformation)),
            userPosts: JSON.parse(JSON.stringify(userPosts))
        }
    };
};