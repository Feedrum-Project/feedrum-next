import { Post } from "@prisma/client";
import PostController from "controllers/post.controller";
import { GetServerSideProps } from "next";
import PostComponent from "components/Post/Post";
import styles from './home.module.sass';
import Aside from "components/Aside/Aside";

interface HomeProps {
    posts: Post[]
}

export default function Home({ posts }: HomeProps) {
    return (
        <>
            <div className={styles.main}>
                <article className={styles.article}>
                    <div className={styles.sorting}>
                        <input type="button" value="Найновіщі" className={styles.new}/>
                        <input type="button" value="Найкращі" className={styles.best}/>
                        <input type="button" value="Популярні" className={styles.popular}/>
                    </div>
                    <div className={styles.posts}>
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    const posts = await PostController.getAll(0, 20)

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)) // It breaks without this json fuckery
        }
    }
}