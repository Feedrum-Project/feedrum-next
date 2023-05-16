import Link from "next/link";

import { GetServerSideProps } from "next";
import { IPost } from "types/Post";
import { IUser } from "types/User";

import prisma from "@database";
import { useSelector } from "react-redux";

interface IPage {
    postContent: IPost;
    author: IUser;
}

export default function EditPost({postContent, author}: IPage) {
    const user: IUser = useSelector((state: {user: IUser}) => state).user;
    if(author.id !== user.id) {
        return <h1 style={{color: "white", width: '40rem'}}>
            Ви не маєте права на редугваня цієї сторінки,
            будемо вдячні якщо ви повернетеся <Link href="/" style={{color: "#AE80C3"}}>на головну</Link>.
            </h1>;
    } else {
        return (
            <>
                <h1 style={{color: "white"}}>Редагування сторінки</h1>
                <span style={{color: "white"}} contentEditable suppressContentEditableWarning>
                    {postContent.body}
                </span>
            </>
        )
    }
}

export const getServerSideProps:GetServerSideProps = async (context) => {

    const id = Number(context.query.id);
    const post: IPost | null = await prisma.post.getPostById(id);
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