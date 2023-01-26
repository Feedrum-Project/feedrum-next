import Footer from "./Footer";
import Header from "./Header";
import { ThemeProvider } from "styled-components"
import theme from "styles/theme";
import styles from '../styles/layout.module.css'

type Props = { children: React.ReactNode };
export default function Layout({ children }: Props) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />
                <main className={styles["main"]}>{children}</main>
            </ThemeProvider>
        </>
    )
}
