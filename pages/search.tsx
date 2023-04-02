import styles from "../styles/search.module.sass";
import { IPost, IComment } from "types/Post";
import { IUser } from "types/User";
import { useState } from "react";
import Post from "module/Post/Post";

interface IResult {
    posts: IPost[] | null;
    users: IUser[] | null;
    comments: IComment[] | null;
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
                                <button>Абеткувати</button>
                            </div>
                            {
                                result.posts ? result.posts.map(e => {
                                    return (
                                        <Post key={e.id} postData={e}/>
                                    );
                                }) : null
                            }
                        </>
                        : chapter === "users" ?
                            <>
                                <h1>users</h1>
                            </> :
                            <>
                                <h1>comments</h1>
                            </>
                }
            </div>
            <aside className={styles.chapters}>
                <h1 className={styles.chaptersTop}>Тип</h1>
                <div className={styles.chaptersBottom}>
                    <button 
                        className={[styles.chapter, chapter === "posts" ? styles.selected : undefined].join("")}
                        onClick={() => setChapter("posts")}
                        id="1">Пости</button>
                    <button 
                        className={[styles.chapter, chapter === "users" ? styles.selected : undefined].join("")}
                        onClick={() => setChapter("users")}
                        id="2">Користувачі</button>
                    <button 
                        className={[styles.chapter, chapter === "comments" ? styles.selected : undefined].join("")}
                        onClick={() => setChapter("comments")}
                        id="3">Коментарі</button>
                </div>
            </aside>
        </div>
    );
}

export function getServerSideProps(ctx: any) {
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
                userId:6,
            },
            {
                id: 4,
                body:"green grass",
                title:"Зеленкувата трава",
                rank:18,
                createdAt: new Date(Math.random() * 1000000000000).toString(),
                userId:2,
            },
            
        ],
        users: [],
        comments: []
    };
    return {
        props: {result}
    };
}