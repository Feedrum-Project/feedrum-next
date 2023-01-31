import Layout from "components/Layout/Layout"
import type { AppProps } from "next/app"
import GlobalStyle from "styles/globalStyles"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
        </Layout>
    )
}
