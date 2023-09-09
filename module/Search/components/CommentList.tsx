import { IComment } from "types/Post";
import styles from "../styles/search.module.sass";
import { useState } from "react";
import Comment from "components/Comment/Comment";
import { useSelector } from "react-redux";
import { IStore } from "store/store";

type localComment = IComment[] | undefined;

interface IList {
  comments: localComment;
}
export default function CommentList({ comments }: IList) {
  const { user } = useSelector((store: IStore) => store).user;

  const [sorted, setSorting] = useState<{
    comments: localComment;
    sort: "best" | "popular";
  }>({ comments, sort: "best" });

  function sortBest(array: localComment) {
    return setSorting({
      comments: array
        ? array.sort((a, b) => (a.rank > b.rank ? -1 : 1))
        : undefined,
      sort: "best"
    });
  }

  function sortPopular(array: localComment) {
    return setSorting({
      comments: array
        ? array.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        : undefined,
      sort: "popular"
    });
  }

  return (
    <>
      <div className={styles.sort}>
        <button
          className={sorted.sort === "best" ? styles.selected : undefined}
          onClick={() => sortBest(sorted.comments)}
        >
          Найновіщі
        </button>
        <button
          className={sorted.sort === "popular" ? styles.selected : undefined}
          onClick={() => sortPopular(sorted.comments)}
        >
          Популярні
        </button>
      </div>
      {comments && comments.length ? (
        <div className={styles.list}>
          {sorted.comments &&
            sorted.comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  key={comment.id}
                  //postInfo
                  disabled={
                    user ? (user.id !== comment.User.id ? false : true) : true
                  }
                />
              );
            })}
        </div>
      ) : (
        <h1 className="gray">Без коментарів</h1>
      )}
    </>
  );
}
