import Layout from "components/Layout/Layout"
import type { AppProps } from "next/app"
import GlobalStyle from "styles/globalStyles"
import { Raleway } from "@next/font/google"

const raleway = Raleway(
    {
        weight:["400", "600", "800"],
        subsets: ["latin", "cyrillic"]
    })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={raleway.className}>
            <Layout>
                <GlobalStyle />
                <Component {...pageProps} />
            </Layout>
        </div>
    )
}
