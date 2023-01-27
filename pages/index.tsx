import { Post } from "@prisma/client";
import PostController from "controllers/post.controller";
import { GetServerSideProps } from "next";
import PostComponent from "components/Post";
import styles from '../styles/home.module.sass';
import Aside from "components/Aside";
interface Props {
    posts: Post[]
}

export default function Home({ posts }: Props) {
    posts = [
        {id:1, title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:5, createdAt:new Date(2021, 5, 1, 1, 22), userId:555},
        {id:2,  title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:7, createdAt:new Date(2021, 1, 12, 13, 11), userId:555},
        {id:3,  title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:-200000, createdAt:new Date(2021, 1, 12, 13, 11), userId:555},
        {id:4,  title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:7, createdAt:new Date(2021, 1, 12, 13, 11), userId:555},
        {id:5,  title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:-200000, createdAt:new Date(2021, 1, 12, 13, 11), userId:555},
        {id:6,  title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:7, createdAt:new Date(2021, 1, 12, 13, 11), userId:555},
        {id:7,  title:"Як створити найкраще бургер меню у css?", body:"Як що ви web-розробник то доволі часто ви зустрічаєтеся з проблемою створення бургер меню. Яким чином її відобразити, та як зробити її функціонал ви зараз дізнаєтеся. Для початку хочу назвати основні шляхи для відображення самої іконки....", rank:-200000, createdAt:new Date(2021, 1, 12, 13, 11), userId:555},

    ]
    return (
        <>
            <div className={styles["main"]}>
                <article className={styles["article"]}>
                    <div className={styles["sorting"]}>
                        <input type="button" value="Найновіщі" className={styles["new"]}/>
                        <input type="button" value="Найкращі" className={styles["best"]}/>
                        <input type="button" value="Популярні" className={styles["popular"]}/>
                    </div>
                    <div className={styles["posts"]}>
                        {posts.map(post => (
                            <PostComponent key={post.id} postData={post}/>
                        ))}
                    </div>
                </article>
                <Aside/>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const posts = await PostController.getAll(0, 20)

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)) // It breaks without this json fuckery
        }
    }
}