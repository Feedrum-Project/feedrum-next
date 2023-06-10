import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/global.sass";
import { Raleway } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../store/store";

const raleway = Raleway(
    {
        weight:["400", "600", "800"],
        subsets: ["latin", "cyrillic"]
    });

export default function App({ Component, pageProps }: AppProps) {
    
    return (
        <Provider store={store}>
            <div className={raleway.className}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </Provider>
    );
}