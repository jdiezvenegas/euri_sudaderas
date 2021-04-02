import Head from "next/head";
import ClientOnly from "../domain/hooks/client-only";
import ProductList from "../components/products/list";
import GoToCartButton from "../components/cart/goto";

export default function ProductsPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoToCartButton />
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