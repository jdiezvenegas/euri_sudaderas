import Head from "next/head";
import { client } from "../utils";
import { ApolloProvider } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { Layout } from "../components";

import "../styles/style.scss";

export default function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")) || {}
      : {}
  );

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Tienda Eurielec</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout cart={cart} setCart={setCart}>
        <Component {...pageProps} cart={cart} setCart={setCart} />
      </Layout>
    </ApolloProvider>
  );
}
