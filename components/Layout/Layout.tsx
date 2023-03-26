import Head from "next/head";
import Header from "../../module/Header/Header";
import styles from "./layout.module.sass";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/me", {
            method: "post"
        })
            .then(res => res.json())
            .then(res => dispatch({type: "set", payload: res}))
            .catch(() => {
                document.cookie = "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            });
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Feedrum</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Header />
            <main className={styles.main}>{children}</main>
        </>
    );
}
