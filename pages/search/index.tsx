import styles from "styles/search.module.sass";
import { IComment, IPost } from "types/Post";
import { IUserExtended } from "types/User";
import { useState } from "react";
import search from "helpers/search.helper";
import PostList from "module/Search/components/PostList";
import UserList from "module/Search/components/UserList";
import CommentList from "module/Search/components/CommentList";

interface IResult {
  posts: IPost[] | undefined;
  users: IUserExtended[] | undefined;
  comments: IComment[] | undefined;
}

export default function Search({ result }: { result: IResult }) {
  const [chapter, setChapter] = useState<"posts" | "users" | "comments">(
    "posts"
  );

  return (
    <div className={styles.search}>
      <div className={styles.results}>
        {chapter === "posts" ? (
          <PostList posts={result.posts} />
        ) : chapter === "users" ? (
          <UserList users={result.users} />
        ) : (
          <CommentList comments={result.comments} />
        )}
      </div>
      <aside className={styles.chapters}>
        <h1 className={styles.chaptersTop}>Тип</h1>
        <div className={styles.chaptersBottom}>
          <button
            className={[
              styles.chapter,
              chapter === "posts" ? styles.selected : undefined
            ].join(" ")}
            onClick={() => setChapter("posts")}
            id="1"
          >
            Пости
          </button>
          <button
            className={[
              styles.chapter,
              chapter === "users" ? styles.selected : undefined
            ].join(" ")}
            onClick={() => setChapter("users")}
            id="2"
          >
            Користувачі
          </button>
          <button
            className={[
              styles.chapter,
              chapter === "comments" ? styles.selected : undefined
            ].join(" ")}
            onClick={() => setChapter("comments")}
            id="3"
          >
            Коментарі
          </button>
        </div>
      </aside>
    </div>
  );
}

export async function getServerSideProps(ctx: { query: { q: string } }) {
  const quest = ctx.query.q;

  const result: IResult = (await search(quest)) as any; // we temporarly do this.
  return {
    props: {
      result: JSON.parse(JSON.stringify(result))
    }
  };
}
