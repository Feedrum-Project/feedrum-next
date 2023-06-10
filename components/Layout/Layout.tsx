import Head from "next/head";
import Header from "../../module/Header/Header";
import Footer from "../../module/Footer/Footer";
import styles from "./styles/layout.module.sass";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Notifications from "module/Notifications/notifications";
import { IStore } from "store/store";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    const path = useRouter().pathname;
    const condition = path === "/registration" || path === "/login" || path === "/forgetPassword";

    const {notification} = useSelector((state: IStore) => state.notification);
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetch("/api/auth/me", {
            method: "post"
        })
            .then(res => res.json())
            .then(res => {
                res.id === -1 ? dispatch({type: "setUser", payload: {id: 0}}) :
                    dispatch({type: "setUser", payload: res});

                res?.isVerified ? null : dispatch(
                    {
                        type: "setNotification",
                        payload: notification === null ? [
                            {id: 0, type: "bad", title: "Ви не підтвердили свою пошту", text: "Перевірте свою скриньку на наявність верефікаційного листа"},
                            
                        ]
                            : [
                                ...notification,
                                {
                                    id: notification.length,
                                    type: "bad",
                                    title: "Ви не підтвердили свою пошту",
                                    text: "Перевірте свою скриньку на наявність верефікаційного листа"
                                }
                            ]
                    }
                );
            })
            .catch((e) => {
                console.log(e);
                dispatch({type:"setUser", payload:{id: 0}});
                dispatch(
                    {
                        type: "setNotification",
                        payload: notification === null ? [
                            {id: 0, type: "bad", title: "Ваша сесія застаріла", text: "Будь-ласка увійдіть знову"}
                        ]
                            : [
                                ...notification,
                                {id: notification.length, type: "bad", title: "Ваша сесія застаріла", text: "Будь-ласка увійдіть знову"}
                            ]
                    }
                );
                // throw e;
            });
    }, []);

    return (
        <>
            <Head>
                <title>Feedrum</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            {
                condition ? null : <Header />
            }
            <Notifications/>
            <main className={styles.main}>{children}</main>
            {
                condition ? null : <Footer />}
        </>
    );
}
