import { NextApiRequest, NextApiResponse } from 'next';

import { createServer } from '@graphql-yoga/node'
import gql from 'graphql-tag'
import resolvers from 'lib/resolvers'
import typeDefs from 'lib/schema'

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: {
    typeDefs: gql(typeDefs),
    resolvers,
  },
  endpoint: '/api/graphql',

  // graphiql: false // uncomment to disable GraphiQL
});

export default server
