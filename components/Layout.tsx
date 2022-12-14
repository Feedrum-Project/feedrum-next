import Footer from "./Footer";
import Header from "./Header";
import { ThemeProvider } from "styled-components"
import theme from "styles/theme";

type Props = { children: React.ReactNode };
export default function Layout({ children }: Props) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />
                <main>{children}</main>
                <Footer />
            </ThemeProvider>
        </>
    )
}
