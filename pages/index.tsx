import { Post } from "@prisma/client";
import PostController from "controllers/post.controller";
import { GetServerSideProps } from "next";

interface Props {
    posts: Post[]
}

export default function Home({ posts }: Props) {
    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    {post.body}
                </div>
            ))}
        </div>
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