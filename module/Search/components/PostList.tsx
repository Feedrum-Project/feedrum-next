import Post from "components/Post/Post";
import { useState } from "react";
import { IPost } from "types/Post";
import styles from "../styles/search.module.sass";

type localPost = IPost[] | undefined;
interface IList {
  posts: localPost;
}
export default function PostList({ posts }: IList) {
  const [sorted, setSorting] = useState<{
    posts: localPost;
    sort: "new" | "best" | "popular";
  }>({ posts, sort: "new" });

  function sortNew(array: localPost) {
    return setSorting({
      posts: array
        ? array.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        : undefined,
      sort: "new"
    });
  }

  function sortBest(array: localPost) {
    return setSorting({
      posts: array
        ? array.sort((a, b) => (a.rank > b.rank ? -1 : 1))
        : undefined,
      sort: "best"
    });
  }

  function sortPopular(array: localPost) {
    return setSorting({
      posts: array
        ? array.sort((a, b) =>
            a._count && b._count
              ? a._count.Comments > b._count.Comments
                ? -1
                : 1
              : -1
          )
        : undefined,
      sort: "popular"
    });
  }

  return (
    <>
      <div className={styles.sort}>
        <button
          className={sorted.sort === "new" ? styles.selected : undefined}
          onClick={() => sortNew(sorted.posts)}
        >
          Найновіщі
        </button>
        <button
          className={sorted.sort === "best" ? styles.selected : undefined}
          onClick={() => sortBest(sorted.posts)}
        >
          Найкращі
        </button>
        <button
          className={sorted.sort === "popular" ? styles.selected : undefined}
          onClick={() => sortPopular(sorted.posts)}
        >
          Популярні
        </button>
      </div>
      {sorted.posts && sorted.posts.length !== 0 ? (
        sorted.posts.map((post) => {
          return <Post key={post.id} postData={post} />;
        })
      ) : (
        <h1 className="gray">Ми не знайшли статті :(</h1>
      )}
    </>
  );
}
