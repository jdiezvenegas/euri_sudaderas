import Head from "next/head";
import ClientOnly from "../domain/hooks/client-only";
import ProductList from "../components/products/list";
import Layout from "../components/layout";

export default function ProductsPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <ClientOnly>
          <ProductList />
        </ClientOnly>
      </Layout>
    </div>
  );
}
