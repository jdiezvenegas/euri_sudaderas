import Head from "next/head";
import ClientOnly from "../domain/hooks/client-only";
import CartList from "../components/cart/list";
import Layout from "../components/layout";

export default function CartPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>
          Cart:
        </h1>
        <ClientOnly>
          <CartList />
        </ClientOnly>
      </Layout>
    </div>
  );
}