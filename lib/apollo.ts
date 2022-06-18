import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { IncomingMessage, ServerResponse } from 'http';

import { offsetLimitPagination } from '@apollo/client/utilities';
import resolvers from './resolvers';
import typeDefs from './schema';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createIsomorphLink(context: ResolverContext = {}) {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { makeExecutableSchema } = require('@graphql-tools/schema');

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    return new SchemaLink({ schema, context });
  } else {
    const { HttpLink } = require('@apollo/client');
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });
  }
}

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(context),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            roles: offsetLimitPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

function offsetFromCursor(items, cursor, readField) {
  // Search from the back of the list because the cursor we're

  // looking for is typically the ID of the last item.

  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];

    // Using readField works for both non-normalized objects

    // (returning item.id) and normalized references (returning

    // the id field from the referenced entity object), so it's

    // a good idea to use readField when you're not sure what

    // kind of elements you're dealing with.


    if (readField('id', item) === cursor) {
      // Add one because the cursor identifies the item just

      // before the first item in the page we care about.

      return i + 1;
    }
  }

  // Report that the cursor could not be found.

  return -1;
}
