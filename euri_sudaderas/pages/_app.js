import "../styles/style.scss";
import { AppWrapper } from '../context/state'; 
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </ApolloProvider>
  );
}

export default MyApp;
