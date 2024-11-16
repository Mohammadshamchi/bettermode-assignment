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
          keyArgs: ['spaceIds'],
          merge(existing = { edges: [] }, incoming, { args }) {
            if (!args?.after) {
              return incoming;
            }

            const existingEdges = existing?.edges ?? [];
            const incomingEdges = incoming?.edges ?? [];
            
            interface Edge {
              node: {
                id: string;
                [key: string]: any;
              };
            }

            const existingIds = new Set(existingEdges.map((edge: Edge) => edge.node.id));
            
            const uniqueIncomingEdges = incomingEdges.filter(
              (edge: Edge) => !existingIds.has(edge.node.id)
            );

            return {
              ...incoming,
              edges: [...existingEdges, ...uniqueIncomingEdges],
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
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    },
    query: {
      fetchPolicy: 'cache-first'
    }
  },
});
