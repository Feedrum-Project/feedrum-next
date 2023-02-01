import Head from "next/head";
import Header from "../Header/Header";
import { ThemeProvider } from "styled-components"
import theme from "styles/theme";
import styles from './layout.module.sass'

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <ThemeProvider theme={theme}>
                <Header />
                <main className={styles.main}>{children}</main>
            </ThemeProvider>
        </>
    )
}
