import Head from "next/head";
import Navigation from "../components/navigation";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sudaderas ETSIT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <h1 className="header">Welcome to eurielec.</h1>
        <img scr="/logo_euri.png" />
      </main>
    </div>
  );
}
