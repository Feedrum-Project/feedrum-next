import styles from "styles/search.module.sass";
import { IComment, IPost } from "types/Post";
import { IUser, IUserExtended } from "types/User";
import { useState } from "react";
import Post from "components/Post/Post";
import User from "components/User/User";
import search from "helpers/search.helper";
import Comment from "components/Comment/Comment";
import { useSelector } from "react-redux";
import { IStore } from "store/store";

interface IResult {
  posts: IPost[] | undefined;
  users: IUserExtended[] | undefined;
  comments: IComment[] | undefined;
}

export default function Search({ result }: { result: IResult }) {
  const [chapter, setChapter] = useState<"posts" | "users" | "comments">(
    "posts"
  );
  const { user } = useSelector((store: IStore) => store).user;

  return (
    <div className={styles.search}>
      <div className={styles.results}>
        {chapter === "posts" ? (
          <>
            <div className={styles.sort}>
              <button>Найновіщі</button>
              <button>Найкращі</button>
              <button>Популярні</button>
            </div>
            {result.posts && result.posts.length !== 0 ? (
              result.posts.map((e) => {
                return <Post key={e.id} postData={e} />;
              })
            ) : (
              <h1>Ми не знайшли статті :(</h1>
            )}
          </>
        ) : chapter === "users" ? (
          <>
            <div className={styles.sort}>
              <button>Популярні</button>
              <button>За алфавітом</button>
            </div>
            {result.users && result.users.length !== 0 ? (
              result.users.map((e) => {
                return <User user={e} key={e.id} />;
              })
            ) : (
              <h1>Ми не знайшли користувачів :(</h1>
            )}
          </>
        ) : (
          <>
            <div className={styles.sort}>
              <button>Найновіщі</button>
              <button>Популярні</button>
            </div>
            {result.comments ? null : (
              <h1 style={{ color: "#fff" }}>Без коментарів</h1>
            )}
            {result.comments ? (
              <>
                {result.comments.map((comment) => {
                  return (
                    <Comment
                      comment={comment}
                      key={comment.id}
                      disabled={
                        user
                          ? user.id !== comment.User.id
                            ? false
                            : true
                          : true
                      }
                    />
                  );
                })}
              </>
            ) : null}
          </>
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
