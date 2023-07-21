import Link from "next/link";
import styles from "../post.module.sass";

import { GetServerSideProps } from "next";
import { IPost, IPostId } from "types/Post";
import { IUser } from "types/User";
import { Button } from "components/UI";

import prisma from "@database";
import { useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import CreateForm from "module/CreateForm/CreateForm";

interface IPage {
    postContent: IPost;
    author: IUser;
}

export default function EditPost({postContent, author}: IPage) {
    const {user} = useSelector((state: {user: {user: IUser}}) => state.user);
    const [texts, setText] = useState<string>("");

    function submit(e: FormEvent) {
        e.preventDefault();
        const textBody = document.getElementById("text");
        if(textBody === null) return;
        
        const body = JSON.stringify({
            id: postContent.id,
            post: {
                title: postContent.title,
                body: textBody.innerHTML.split("<br>").join("\n")
            },
        });

        fetch("/api/posts", {
            method: "PUT",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(console.log);
    }

    if(user === null) return;

    if(author.id !== user.id) {
        return <h1 style={{color: "white", width: "40rem"}}>
            Ви не маєте права на редугваня цієї сторінки,
            будемо вдячні якщо ви повернетеся <Link href="/" style={{color: "#AE80C3"}}>на головну</Link>.
        </h1>;
    } else {
        return (
            <div className={styles.edit}>

                <h1>Редагування сторінки</h1>
                <form method="post" onSubmit={submit}>
                    <span
                        id="text"
                        className={styles.text}
                        contentEditable
                        suppressContentEditableWarning
                        dangerouslySetInnerHTML={{__html: postContent.body.split("\n").join("<br/>")}}>
                    </span>
                    <br />
                    <div className="minWidth">
                        <Button Style="purple" type="submit">Edit</Button>
                    </div>
                </form>
                <CreateForm texts={[texts, setText]}/>
            </div>
        );
    }
}

export const getServerSideProps:GetServerSideProps = async (context) => {

    const id = Number(context.query.id);
    const post: IPostId | null  = await prisma.post.getPostById(id);
    const postParsed = JSON.parse(JSON.stringify(post));

    if(postParsed === null) {
        return {
            props: {
                postContent: {
                    body: "We haven't been found it"
                },
                author: {id: -1}
            }
        };
    }
    const author = await prisma.user.getUserById(postParsed.userId);
    const authorParsed = JSON.parse(JSON.stringify(author));
    
    return {
        props: {
            postContent: postParsed,
            author: authorParsed
        }
    };
};