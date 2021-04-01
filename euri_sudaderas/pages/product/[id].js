import Head from "next/head";
import ClientOnly from "../../domain/hooks/client-only";
import SingleProduct from "../../components/products/single";

import { useRouter } from 'next/router'

export default function SingleProductPage() {
    const router = useRouter()
    const { id } = router.query
    console.log(id)

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
                <SingleProduct id={id} />
            </ClientOnly>
            </main>
        </div>
    );
}