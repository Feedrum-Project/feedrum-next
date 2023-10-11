import Head from "next/head";
import Header from "../../module/Header/Header";
import Footer from "../../module/Footer/Footer";

import styles from "./styles/layout.module.sass";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Notifications from "module/Notifications/notifications";
import favicon from "../../images/logo.svg";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  const path = useRouter().pathname;
  const condition =
    path === "/registration" ||
    path === "/login" ||
    path === "/forgetPassword" ||
    path === "/users/submit";
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/auth/me", {
      method: "post"
    })
      .then((res) => res.json())
      .then((res) => {
        res.id === -1
          ? dispatch({ type: "setUser", payload: { id: 0 } })
          : dispatch({ type: "setUser", payload: res });

        // res.isVerified
        //   ? null
        //   : dispatch({
        //       type: "addNotification",
        //       payload: {
        //         type: "bad",
        //         title: "Ви не підтвердили свою пошту",
        //         text: "Перевірте свою скриньку на наявність верефікаційного листа"
        //       }
        //     });
        // left it for better times.
      })
      .catch(() => {

        dispatch({ type: "setUser", payload: { id: 0 } });

        dispatch({
          type: "addNotification",
          payload: {
            type: "bad",
            title: "Ваша сесія застаріла",
            text: "Будь-ласка увійдіть знову"
          }
        });
      });
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Feedrum</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Ласкаво просимо до Feedrum. Feedrum - це платформа блогів від програмістів до програмістів, українською мовою"
        />
        <meta name="author" content="Feedrum.com" />

        <link rel="icon" type="image/x-icon" href={favicon.src} />
      </Head>
      {condition ? null : <Header />}
      <Notifications />
      <main className={styles.main}>{children}</main>
      {condition ? null : <Footer />}
    </>
  );
}
