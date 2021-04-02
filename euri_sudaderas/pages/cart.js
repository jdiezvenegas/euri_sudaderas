import Head from "next/head";
import ClientOnly from "../domain/hooks/client-only";
import CartList from "../components/cart/list";
import GoToCartButton from "../components/cart/goto";

export default function CartPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoToCartButton />
        <h1>
          Cart:
        </h1>
        <ClientOnly>
          <CartList />
        </ClientOnly>
      </main>
    </div>
  );
}