import Head from "next/head";
import ClientOnly from "../../domain/hooks/client-only";
import SingleProduct from "../../components/products/single";

import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function SingleProductPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <ClientOnly>
          <SingleProduct id={id} />
        </ClientOnly>
      </Layout>
    </div>
  );
}
