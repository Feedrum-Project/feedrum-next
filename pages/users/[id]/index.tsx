import prisma from "@database";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Button from "components/UI/Button/Button";
import Rank from "module/Aside/Components/Rank";
import AsideInfo from "module/Aside/Components/AsideInfo";

import styles from "./profile.module.sass";

import message from "images/message.svg";
import avatar from "images/avatar.svg";

import { IUser } from "types/User";
import { IComment, IPostId } from "types/Post";
import getRelative from "helpers/time.helper";
import { IStore } from "store/store";
import Star from "components/UI/Star/Star";

interface UserProps {
  userInformation: IUser | null;
  userPosts: IPostId[] | [];
  userComments: IComment[];
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
          <Image src={avatar} alt="Аватар" className={styles.topAvatar} />
          <span className={styles.nameNick}>{userInformation.name}</span>
        </div>
        <div className={styles.profileAside}>
          <Button Style="purple">Підписатися</Button>
          <Rank
            info={userInformation}
            disabled={user !== null && user.id === userInformation.id}
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
                      <div key={e.id} className={styles.post}>
                        <div className={styles.postTime}>
                          <span>{getRelative(new Date(e.createdAt))}</span>
                        </div>
                        <div className={styles.postContent}>
                          <div className={styles.postTitle}>
                            <Link
                              href={`/posts/${e.id}`}
                              key={e.id}
                              style={{
                                textDecoration: "none",
                                color: "white"
                              }}
                            >
                              {e.title}
                            </Link>
                          </div>
                          <div className={styles.postBody}>{e.body}</div>
                        </div>
                        <div className={styles.postBottom}>
                          <div className={styles.postComments}>
                            <Image
                              width="14"
                              height="13"
                              src={message}
                              alt="Повідомлення"
                            />
                            {e._count ? <span>{e._count.Comments}</span> : null}
                          </div>
                          <div className={styles.postRank}>
                            <Star reputation={e.rank} />
                          </div>
                        </div>
                      </div>
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
                    <div key={comment.id} className={styles.comment}>
                      <div className={styles.commentPost}>
                        <span className={styles.commentPostName}>
                          <Link href={"/posts/" + comment.Post.id}>
                            {comment.Post.title}
                          </Link>
                        </span>
                      </div>
                      <div className={styles.commentBody}>
                        <div className={styles.commentContent}>
                          <div className={styles.commentContentTop}>
                            <div className={styles.commentContentAuthor}>
                              <Image src={avatar} alt="аватар" width={18} />
                              <span className={styles.commentAuthorName}>
                                {comment.User.name}
                              </span>
                              <span
                                className={[
                                  styles.commentAuthorRank,
                                  comment.User.rank > 0
                                    ? "green"
                                    : comment.User.rank < 0
                                    ? "red"
                                    : "gray"
                                ].join("")}
                              >
                                (
                                {comment.User.rank > 0
                                  ? "+"
                                  : comment.User.rank < 0
                                  ? "-"
                                  : null}
                                {comment.User.rank})
                              </span>
                            </div>
                            <div className="commentDate">
                              {getRelative(new Date(comment.createdAt))}
                            </div>
                          </div>
                          <div className="bodyContent">{comment.body}</div>
                        </div>
                      </div>
                    </div>
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
        <Button
          Style="purple"
          onClick={() => {
            document.cookie =
              "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            dispatch({ type: "set", payload: { id: -1 } });
          }}
        >
          Вийти з облікового запису
        </Button>
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
  const userComments: IComment[] = await prisma.user.getUserComments(
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
