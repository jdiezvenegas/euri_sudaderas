import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sudaderas ETSIT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="header">Welcome to eurielec.</h1>
        <img scr="/logo_euri.png" />
      </Layout>
    </div>
  );
}
