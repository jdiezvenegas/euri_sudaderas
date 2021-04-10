import "../styles/style.scss";
import { AppProvider } from '../context/app-context'; 
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ApolloProvider>
  );
}

export default MyApp;
