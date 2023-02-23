import { Post } from "@prisma/client";
import PostController from "controllers/post.controller";
import { GetServerSideProps } from "next";
import PostComponent from "module/Post/Post";
import styles from "./home.module.sass";
import Aside from "module/Aside/Aside";
import { useState } from "react";

interface HomeProps {
    posts: Post[]
}

export default function Home({ posts }: HomeProps) {

    const [postsSorted, setPostsSorted] = useState(posts)

    function setSortingBest() {
        const buffer = postsSorted.sort((a,b):any => {
            if(a.rank<b.rank) return a.rank+b.rank
            return a.rank-b.rank
        })
        setPostsSorted(buffer)
    }
    // function setSortingNew() {
    //     sort = "new"
    //     const buffer = postsSorted.sort((a,b):any => {
    //         if(a.createdAt<b.createdAt) return Date.parse(a.createdAt)+Date.parse(b.createdAt)
    //         return Date.parse(a.createdAt)-Date.parse(b.createdAt)
    //     })
    //     setPostsSorted(buffer)
    //     console.log(postsSorted)
    // }
    

    return (
        <>
            <div className={styles.main}>
                <article className={styles.article}>
                    <div className={styles.sorting}>
                        <input type="button" value="Найновіщі" className={styles.new}/>
                        <input type="button" onClick={() => setSortingBest()} value="Найкращі" className={styles.best}/>
                        <input type="button" value="Популярні" className={styles.popular}/>
                    </div>
                    <div className={styles.posts}>
                        {
                            postsSorted.map(post => (
                                <PostComponent key={post.id} postData={post}/>
                            ))
                        }
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