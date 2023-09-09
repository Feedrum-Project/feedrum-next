import prisma from "@database";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Button from "components/UI/Button/Button";
import Rank from "module/Aside/Components/Rank";
import AsideInfo from "module/Aside/Components/AsideInfo";

import styles from "./profile.module.sass";

import { IUser } from "types/User";
import { IPost, IPostId } from "types/Post";
import { IStore } from "store/store";
import Comment from "components/Comment/Comment";
import Post from "components/Post/Post";
import UserComponent from "components/UI/UserComponent/UserComponent";

interface IUserComment {
  id: number;
  body: string;
  rank: number;
  createdAt: Date | string;
  User: IUser;
  Post: IPost;
}

interface UserProps {
  userInformation: IUser | null;
  userPosts: IPostId[] | [];
  userComments: IUserComment[];
}

export default function User({
  userInformation,
  userPosts,
  userComments
}: UserProps) {
  const { user } = useSelector((state: IStore) => state).user;

  const [sortPosts, setSortPosts] = useState<"new" | "best" | "popular">("new");
  const [type, setType] = useState<"posts" | "comments" | "subs">("posts");

  const dispatch = useDispatch();

  if (!userInformation)
    return (
      <div className={styles.main}>
        <h1>Користувача не знайдено!</h1>
      </div>
    );
  return (
    <>
      <Head>
        <meta
          name="description"
          content={"Обліковий запис користувача " + userInformation.name}
        />
        <meta name="author" content={userInformation.name} />
      </Head>
      <div className={styles.top}>
        <div className={styles.name}>
          <UserComponent user={userInformation as any} isBig />
        </div>
        <div className={styles.profileAside}>
          <Button Style="purple">Підписатися</Button>
          <Rank
            info={userInformation}
            disabled={user !== null && (user.id === 0 || user.id === userInformation.id)}
          />
        </div>
      </div>
      <div className={styles.main}>
        <article className={styles.profile}>
          <div className={styles.profileContent}>
            {type === "posts" ? (
              !userPosts.length ? (
                <div>
                  <h1 style={{ width: "20rem" }}>
                    У&nbsp;користувача відсутні свої статті.
                  </h1>
                </div>
              ) : (
                <>
                  <div className={styles.sort}>
                    <button
                      onClick={() => setSortPosts("new")}
                      className={
                        sortPosts === "new" ? styles.choosed : styles.unchoosed
                      }
                    >
                      Найновіщі
                    </button>
                    <button
                      onClick={() => setSortPosts("best")}
                      className={
                        sortPosts === "best" ? styles.choosed : styles.unchoosed
                      }
                    >
                      Найкращі
                    </button>
                    <button
                      onClick={() => setSortPosts("popular")}
                      className={
                        sortPosts === "popular"
                          ? styles.choosed
                          : styles.unchoosed
                      }
                    >
                      Популярні
                    </button>
                  </div>
                  {userPosts.map((e) => {
                    return (
                      <Post
                        postData={e as any}
                        key={e.id}
                        isAuthorShow={false}
                      />
                    );
                  })}
                </>
              )
            ) : type === "comments" ? (
              !userComments.length ? (
                <h1 style={{ width: "20rem" }}>
                  У&nbsp;користувача відсутні свої коментарі.
                </h1>
              ) : (
                userComments.map((comment) => {
                  return (
                    <Comment
                      comment={comment}
                      key={comment.id}
                      postInfo
                      disabled={user?.id === userInformation.id}
                    />
                  );
                })
              )
            ) : (
              <div>
                <div className="list">
                  <h1>Порожній список</h1>
                </div>
              </div>
            )}
          </div>
        </article>
        <aside className={styles.aside}>
          <div className={styles.type}>
            <h1>Тип</h1>
            <div className={styles.menu}>
              <button
                className={
                  type === "posts"
                    ? styles.selectedCategory
                    : styles.unselectedCategory
                }
                onClick={() => setType("posts")}
              >
                Пости
              </button>
              <button
                className={
                  type === "comments"
                    ? styles.selectedCategory
                    : styles.unselectedCategory
                }
                onClick={() => setType("comments")}
              >
                Коментарі
              </button>
              <button
                className={
                  type === "subs"
                    ? styles.selectedCategory
                    : styles.unselectedCategory
                }
                onClick={() => setType("subs")}
              >
                Підписки
              </button>
            </div>
          </div>
          <AsideInfo
            organisation="Щось і Колись"
            createdAt="23 серпня 2021"
            country="Україна"
            description="Житомир - це найкраще місце на усій планеті. Саме там я і народився"
          />
        </aside>
      </div>
      {user !== null && user.id && user.id === userInformation.id ? (
        <div className="minWidth">
          <Button
            Style="purple"
            onClick={() => {
              document.cookie =
                "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              dispatch({ type: "set", payload: { id: -1 } });
            }}
          >
            Вийти&nbsp;з&nbsp;облікового&nbsp;запису
          </Button>
        </div>
      ) : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userInformation: IUser | null = await prisma.user.getUserById(
    Number(context.query.id)
  );
  const userPosts: IPostId[] | [] = await prisma.user.getUserPosts(
    Number(context.query.id)
  );

  const userComments: IUserComment[] = await prisma.user.getUserComments(
    Number(context.query.id)
  );

  return {
    props: {
      userInformation: JSON.parse(JSON.stringify(userInformation)),
      userPosts: JSON.parse(JSON.stringify(userPosts)),
      userComments: JSON.parse(JSON.stringify(userComments))
    }
  };
};
