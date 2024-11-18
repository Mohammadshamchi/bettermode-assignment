import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const httpLink = createHttpLink({
  uri: 'https://api.bettermode.com/graphql',
  credentials: 'omit',
  fetchOptions: {
    mode: 'cors'
  }
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_BETTERMODE_TOKEN;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error) => {
      const shouldRetry = !!error && error.statusCode !== 401;
      if (shouldRetry) {
        console.log('Retrying failed request...');
      }
      return shouldRetry;
    }
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ['spaceIds'],
          merge(existing = { edges: [] }, incoming, { args }) {
            if (!args?.after) {
              return incoming;
            }

            return {
              ...incoming,
              edges: [...(existing.edges || []), ...(incoming.edges || [])],
              pageInfo: incoming.pageInfo
            };
          }
        },
        replies: {
          keyArgs: ['postId'],
          merge(existing = { nodes: [] }, incoming, { args }) {
            if (!args?.after) {
              return incoming;
            }

            const existingNodes = existing?.nodes ?? [];
            const incomingNodes = incoming?.nodes ?? [];

            const existingIds = new Set(existingNodes.map(node => node.id));
            const uniqueIncomingNodes = incomingNodes.filter(
              node => !existingIds.has(node.id)
            );

            return {
              ...incoming,
              nodes: [...existingNodes, ...uniqueIncomingNodes],
            };
          }
        }
      }
    },
    Post: {
      fields: {
        replies: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, retryLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
