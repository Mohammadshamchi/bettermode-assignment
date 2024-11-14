import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.bettermode.com/graphql',
  credentials: 'omit',
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_BETTERMODE_TOKEN;
  
  if (!token) {
    console.error('No token found in environment variables');
  }

  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = { edges: [] }, incoming) {
            return {
              ...incoming,
              edges: [...(existing?.edges || []), ...(incoming?.edges || [])],
            };
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
