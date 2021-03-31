import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sudaderas ETSIT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="header">
          Welcome to <a href="https://eurielec.etsit.upm.es">eurielec</a>
        </h1>
      </main>
    </div>
  );
}
