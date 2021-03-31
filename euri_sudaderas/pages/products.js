import Head from "next/head";
import ClientOnly from "../domain/hooks/client-only";
import ProductList from "../components/ProductList";

export default function ClientSide() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Products:
        </h1>
        <ClientOnly>
          <ProductList />
        </ClientOnly>
      </main>
    </div>
  );
}