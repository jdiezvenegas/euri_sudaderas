import Head from "next/head";
import "../styles/style.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sudaderas ETSIT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://eurielec.etsit.upm.es">eurielec</a>
        </h1>
      </main>
    </div>
  );
}
