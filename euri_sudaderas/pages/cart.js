import Head from "next/head";
import ClientOnly from "../domain/hooks/client-only";
import CartList from "../components/cart/list";
import Layout from "../components/layout";

export default function CartPage() {
  return (
    <div>
      <Head>
        <title>Mi cesta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="cart-container">
          <h1 className="header">Mi cesta</h1>
          <ClientOnly>
            <CartList />
          </ClientOnly>
        </div>
      </Layout>
    </div>
  );
}
