import { IPost } from "types/Post";
import PostController from "controllers/post.controller";
import { GetServerSideProps } from "next";
import PostComponent from "module/Post/Post";
import styles from "../styles/home.module.sass";
import Aside from "module/Aside/Aside";
import { useState } from "react";

interface HomeProps {
    posts: IPost[]
}

export default function Home({ posts }: HomeProps) {

    const [postsSorted, setPostsSorted] = useState<IPost[] | []>(posts);

    function setSortingBest() {
        if(postsSorted === undefined) return;
        let buffer = [...postsSorted].sort((a,b) => {
            return a.rank > b.rank ? -1 : 1;
        });
        setPostsSorted(buffer);
    }
    function setSortingNewest() {
        if(postsSorted === undefined) return;
        let buffer = [...postsSorted].sort((a,b) => {
            return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1;
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
                            postsSorted.length ? postsSorted.map(post => (
                                <PostComponent key={post.id} postData={post}/>
                            )) : <h1>Постів немає, але тримайтесь!</h1>
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
            posts: JSON.parse(JSON.stringify(posts.reverse())) // It breaks without this json fuckery
        }
    };
};