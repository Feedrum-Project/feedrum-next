import styles from "./post.module.sass";
import prisma from "@database";
import { GetServerSideProps } from "next";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import AsideProfile from "module/Aside/Components/AsideProfile";
import SimilarPosts from "module/Aside/Components/SimilarPosts";
import Rank from "module/Aside/Components/Rank";
import Comment from "components/Comment/Comment";
import Textarea from "components/UI/Textarea/Textarea";
import { Button, Input } from "components/UI";
import Modal from "components/Modal/Modal";

import message from "images/message.svg";
import avatar from "images/avatar.svg";
import parser from "helpers/parsers.helper";
import { IComment, IPost, IPostId, lightPost } from "types/Post";
import { IUser } from "types/User";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import AsideTags from "module/Aside/Components/AsideTags";

interface IPostPage {
  postComments: IComment[];
  postContent: IPostId;
  author: IUser;
  similarPosts: (lightPost | any)[] | undefined;
}

export default function PostPage({
  postContent,
  postComments,
  author,
  similarPosts
}: IPostPage) {
  const { user } = useSelector(
    (state: { user: { user: IUser } }) => state.user
  );
  const [attention, setAttention] = useState<{
    code: number;
    message: string;
  } | null>(null);
  const dispatch = useDispatch();

  const [modal, setModal] = useState<{ show: boolean; content: ReactNode }>({
    show: false,
    content: ""
  });

  let content = useRef<null | HTMLDivElement>(null);

  function sub(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { target } = e as unknown as {
      target: { comment: HTMLInputElement };
    };

    const body = JSON.stringify({
      body: target.comment.value,
      postId: postContent.id
    });

    fetch("/api/comments", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((e) => {
        if (e.code !== 200) {
          dispatch({
            type: "addNotification",
            payload: {
              type: "bad",
              title:
                e.data[0].code === "too_small"
                  ? "Куций коментар :("
                  : e.data[0].code,
              text:
                e.data[0].code === "too_small"
                  ? "Ваш коментар має мати як мінімум 16 літер."
                  : e.data[0].message
            }
          });
        } else {
          dispatch({
            type: "addNotification",
            payload: {
              type: "good",
              title: "Коментар надіслано",
              text: "Ваш коментар надіслано."
            }
          });
        }
        setAttention(e);
      });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { target } = event as unknown as {
      target: {
        password: HTMLInputElement;
      };
    };

    const { email } = user;
    const body = JSON.stringify({
      postId: postContent.id,
      email,
      password: target.password.value
    });

    fetch("/api/posts", {
      method: "DELETE",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      dispatch({type: "addNotification", payload: {
        type: "bad",
        title: "Пост ліквідовано",
        text: "Вашого твору більше не існує."
      }});
    });
  }

  useEffect(() => {
    const post_content = parser.MDtoHTML(postContent.body + "\n");
    if (content && content.current) {
      content.current.innerHTML = post_content;
    }
  }, [postContent.body]);

  if (author.id === -1)
    return <h1 style={{ color: "#eee" }}>Статті не було знайдено</h1>;
  return (
    <>
      <Head>
        <meta name="description" content={postContent.body} />
        <meta name="author" content={author.name} />
      </Head>
      <div className={styles.main}>
        <Modal modalState={[modal, setModal]} type="attention" />
        <article className={styles.post}>
          {user !== null ? (
            user.id === postContent.userId ? (
              <div className={styles.author}>
                <Button Style="purple" to={"./" + postContent.id + "/edit"}>
                  Редагувати
                </Button>
                <Button
                  Style="danger"
                  onClick={() => {
                    setModal({
                      show: true,
                      content: (
                        <>
                          <form
                            method="post"
                            className={styles.window}
                            onSubmit={onSubmit}
                          >
                            <h1 className={styles.headtext}>Видалити пост?</h1>
                            <p className={styles.subtext}>
                              Ця дія не відворотня, може хочете просто{" "}
                              <Link
                                className={styles.link}
                                href={"./" + postContent.id + "/edit"}
                              >
                                редагувати
                              </Link>
                              ?
                            </p>
                            <Input
                              Name="Пароль"
                              name="password"
                              type="password"
                              autoComplete={false}
                              placeholder="Пароль вашого облікового запису"
                            />
                            <Button Style="danger" type="submit">
                              Видалити
                            </Button>
                          </form>
                        </>
                      )
                    });
                  }}
                >
                  Видалити
                </Button>
              </div>
            ) : null
          ) : null}
          <h1 className={styles.title}>{postContent.title}</h1>
          <div className={styles.content} ref={content}></div>
          <div className={styles.asideMobile}>
            <SimilarPosts posts={similarPosts} />
          </div>
          <div className={styles.comments}>
            <div className="comments">
              <div className={styles.commentsTitle}>
                <Image
                  src={message}
                  alt="comment icon."
                  width={20}
                  height={18}
                />
                <span className={styles.commentsTitleText}>
                  Коментарі - {postComments.length}
                </span>
              </div>
              <h2
                style={{
                  color:
                    attention && attention.code !== 200 ? "#F36A6A" : "#6AEA3D"
                }}
              >
                {attention ? attention.message : null}
              </h2>
              <form onSubmit={sub} className={styles.comment}>
                <div className={styles.commentLeft}>
                  <Image alt="Аватар" src={avatar} width={40} height={40} />
                </div>
                <div className={styles.commentRight}>
                  <Textarea
                    Name="Комментар"
                    name="comment"
                    maxCount={2048}
                    placeholder="Місце для вашого коментаря"
                    minHeight={130}
                  />
                  <div className={styles.admit}>
                    <Button Style="purple" type="submit">
                      Підтвердити
                    </Button>
                  </div>
                </div>
              </form>
              <div className={styles.commentsList}>
                {postComments.map((e: IComment) => {
                  return (
                    <Comment
                      key={e.id}
                      comment={e}
                      disabled={user !== null && e.User.id === user.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </article>
        <aside className={styles.aside}>
          <AsideProfile userName={author.name} userId={author.id} />
          <SimilarPosts posts={similarPosts} />
          {postContent.Tags ? <AsideTags tags={postContent.Tags as any} /> : null}
          <div style={{ width: "fit-content" }}>
            <Rank
              info={postContent}
              disabled={
                user !== null ? user.id === postContent.userId : undefined
              }
            />
          </div>
        </aside>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.query.id);
  const post: IPost | null = await prisma.post.getPostById(id);
  const postParsed = JSON.parse(JSON.stringify(post));

  let comments: IComment[] = await prisma.post.getPostComments(id);

  comments = comments.sort((a: IComment, b: IComment) => {
    if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
      return 1;
    return -1;
  });

  const commentsParsed = JSON.parse(JSON.stringify(comments));

  if (postParsed === null || post === null || post.Tags === undefined) {
    return {
      props: {
        postContent: {
          body: "We haven't been found it"
        },
        postComments: 0,
        author: { id: -1 }
      }
    };
  }
  const author = await prisma.user.getUserById(postParsed.userId);
  const authorParsed = JSON.parse(JSON.stringify(author));

  const similarPosts: (lightPost | any)[] = [];
  for (const tag of post.Tags!) {
    similarPosts.push(
      await prisma.post.findMany({
        where: {
          Tags: {
            some: {
              tagId: tag.tagId
            }
          }
        },
        select: {
          id: true,
          title: true,
          rank: true,
          _count: {
            select: {
              Comments: true
            }
          }
        },
        take: 3
      })
    );
  }
  return {
    props: {
      postContent: postParsed,
      postComments: commentsParsed,
      author: authorParsed,
      similarPosts: similarPosts[0]
        ? similarPosts[0].filter((sPost: any) => sPost.id !== post.id)
        : undefined
    }
  };
};
