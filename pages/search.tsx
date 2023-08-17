import styles from "../styles/search.module.sass";
import { IComment, IPost } from "types/Post";
import { IUserExtended } from "types/User";
import { useState } from "react";
import Post from "components/Post/Post";
import User from "components/User/User";

interface IResult {
    posts: IPost[];
    users: IUserExtended[];
    comments: IComment[];
}

export default function Search({result}:{result: IResult}) {
    const [ chapter, setChapter ] = useState<"posts" | "users" | "comments">("posts");

    return (
        <div className={styles.search}>
            <div className={styles.results}>
                {
                    chapter === "posts" ?
                        <>
                            <div className={styles.sort}>
                                <button>Найновіщі</button>
                                <button>Найкращі</button>
                                <button>Популярні</button>
                            </div>
                            {
                                result.posts.length !== 0 ? result.posts.map(e => {
                                    return (
                                        <Post key={e.id} postData={e}/>
                                    );
                                }) : <h1>Ми не знайшли статті :(</h1>
                            }
                        </>
                        : chapter === "users" ?
                            <>
                                <div className={styles.sort}>
                                    <button>Популярні</button>
                                    <button>За алфавітом</button>
                                </div>
                                {
                                    result.users.length !== 0 ? result.users.map(e => {
                                        return <User user={e} key={e.id}/>;
                                    }) : <h1>Ми не знайшли користувачів :(</h1>
                                }
                            </> :
                            <>
                                <div className={styles.sort}>
                                    <button>Найновіщі</button>
                                    <button>Популярні</button>
                                </div>
                                <h1 style={{color: "#fff"}}>
                                    Без коментарів
                                </h1>
                            </>
                }
            </div>
            <aside className={styles.chapters}>
                <h1 className={styles.chaptersTop}>Тип</h1>
                <div className={styles.chaptersBottom}>
                    <button 
                        className={[styles.chapter, chapter === "posts" ? styles.selected : undefined].join(" ")}
                        onClick={() => setChapter("posts")}
                        id="1">Пости</button>
                    <button 
                        className={[styles.chapter, chapter === "users" ? styles.selected : undefined].join(" ")}
                        onClick={() => setChapter("users")}
                        id="2">Користувачі</button>
                    <button 
                        className={[styles.chapter, chapter === "comments" ? styles.selected : undefined].join(" ")}
                        onClick={() => setChapter("comments")}
                        id="3">Коментарі</button>
                </div>
            </aside>
        </div>
    );
}

export async function getServerSideProps(ctx: any) {
    const quest = ctx.query.q;
    
    // imitation
    const result:IResult = {
        posts: [
            {
                id: 1,
                body:"Трава не зелена, а помаранчева)",
                title:"Думка аматора",
                rank:-6,
                createdAt: new Date(Math.random() * 1000000000000).toString(),
                User: {
                    id: 1,
                    name: "admin",
                    email: "",
                    rank: 5,
                    createdAt: new Date(),
                    isVerified: true,
                }
            },
            {
                id: 4,
                body:"green grass",
                title:"Зеленкувата трава",
                rank:18,
                createdAt: new Date(Math.random() * 1000000000000).toString(),
                User: {
                    id: 2,
                    name: "moder",
                    email: "",
                    rank: 2,
                    createdAt: new Date(),
                    isVerified: true,
                }
            },
            
        ],
        users: [
            {
                id: 1,
                name: "Elias",
                email: "elias@feedrum.com",
                createdAt: new Date(Math.random() * 1000000000000).toString(),
                rank:506,
                isVerified:true,
                description: "Житомир - це найкраще місце на усій планеті. Саме там я і народився і жив довго та цікаво",
                subscribers: 231
            },
            {
                id: 77,
                name: "Elias2.0",
                email: "elias2@feedrum.com",
                createdAt: new Date(Math.random() * 1000000000000).toString(),
                rank:-72,
                isVerified:true,
                description: "Житомир - це найкраще місце на усій планеті. Саме там я і народився і жив довго та цікаво",
                subscribers: 2
            },
        ],
        comments: []
    };
    return {
        props: {
            result: JSON.parse(JSON.stringify(result))
        }
    };
}