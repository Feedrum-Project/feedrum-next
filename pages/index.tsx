import { IPost } from "types/Post";
import PostController from "controllers/post.controller";
import { GetServerSideProps } from "next";
import PostComponent from "module/Post/Post";
import styles from "./home.module.sass";
import Aside from "module/Aside/Aside";
import { useState } from "react";

interface HomeProps {
    posts: IPost[]
}

export default function Home({ posts }: HomeProps) {

    const [postsSorted, setPostsSorted] = useState<IPost[] | undefined>(posts);

    function setSortingBest() {
        if(postsSorted === undefined) return;
        const buffer = postsSorted.sort((a,b):any => {
            if(a.rank<b.rank) return a.rank+b.rank;
            return a.rank-b.rank;
        });
        setPostsSorted(buffer);
    }
    function setSortingNewest() {
        if(postsSorted === undefined) return;
        const buffer = postsSorted.sort((a,b):any => {
            if(typeof a.createdAt === "string" || typeof b.createdAt === "string") return;
            
            if(a.createdAt.getTime() < b.createdAt.getTime()) return a.createdAt < b.createdAt;
            return a.createdAt > b.createdAt;
        });
        setPostsSorted(buffer);
    }

    return (
        <>
            <div className={styles.main}>
                <article className={styles.article}>
                    <div className={styles.sorting}>
                        <input 
                            type="button"
                            onClick={() => setSortingNewest()}
                            value="Найновіщі"
                            className={styles.new}/>
                        <input 
                            type="button"
                            onClick={() => setSortingBest()}
                            value="Найкращі"
                            className={styles.best}/>
                        <input 
                            type="button"
                            value="Популярні"
                            className={styles.popular}/>
                    </div>
                    <div className={styles.posts}>
                        {
                            postsSorted !== undefined ? postsSorted.map(post => (
                                <PostComponent key={post.id} postData={post}/>
                            )) : null
                        }
                    </div>
                </article>
                <Aside BestsPosts Sponsors/>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    const posts = await PostController.getAll(0, 20);

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)) // It breaks without this json fuckery
        }
    };
};