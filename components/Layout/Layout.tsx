import Head from "next/head";
import Header from "../../module/Header/Header";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
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
            .then(e => dispatch({type: "set", payload: e}));
    }, []);

    return (
        <>
            <Head>
                <title>Feedrum</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <ThemeProvider theme={theme}>
                <Header />
                <main className={styles.main}>{children}</main>
            </ThemeProvider>
        </>
    );
}
