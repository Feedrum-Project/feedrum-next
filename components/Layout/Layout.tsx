import Head from "next/head";
import Header from "../../module/Header/Header";
import Footer from "../../module/Footer/Footer";
import styles from "./styles/layout.module.sass";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    const path = useRouter().pathname;
    const condition = path === "/registration" || path === "/login" || path === "/forgetPassword";

    const dispatch = useDispatch();
    
    useEffect(() => {
        fetch("/api/auth/me", {
            method: "post"
        })
            .then(res => res.json())
            .then(res => {
                res.id === -1 ? dispatch({type: "set", payload: {id: 0}}) :
                    dispatch({type: "set", payload: res});
            })
            .catch((e) => {
                console.log(e);
                // dispatch({type:"set", payload:{id: 0}});
                // document.cookie = "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                // throw e;
            });
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Feedrum</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            {
                condition ? null : <Header />
            }
            <main className={styles.main}>{children}</main>
            {
                condition ? null : <Footer />}
        </>
    );
}
