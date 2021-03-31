import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://wordpress.eurielec.etsit.upm.es/graphql',
  cache: new InMemoryCache()
});

export default client;
