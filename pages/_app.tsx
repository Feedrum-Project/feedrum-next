import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import GlobalStyle from "styles/globalStyles";
import { Raleway } from "@next/font/google";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../store/user";

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
                    <GlobalStyle />
                    <Component {...pageProps} />
                </Layout>
            </div>
        </Provider>
    );
}