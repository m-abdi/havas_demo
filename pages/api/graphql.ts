import { NextApiRequest, NextApiResponse } from 'next';
import { createSchema, createYoga } from 'graphql-yoga';

import { getSession } from 'next-auth/react';
import gql from 'graphql-tag';
import logger from '../../src/logger';
import resolvers from 'lib/resolvers';
import typeDefs from 'lib/schema';
import { useLogger } from '@envelop/core';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};
export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema({
    typeDefs: gql(typeDefs),
    resolvers,
  }) as any,
  graphqlEndpoint: '/api/graphql',
  logging: {
    debug(...args) {
      logger.debug({...args});
    },
    info(...args) {
      logger.info({...args});
    },
    warn(...args) {
      logger.warn({...args});
    },
    error(...args) {
      logger.error({...args});
    },
  },
  context: async ({ req, params }) => {
    const session = await getSession({ req });
    logger.info(
      {
        type: 'request',
        session,
        data: { ...params.variables },
        headers: req.headers,
      },
      `${params.operationName} request`
    );

    return {
      session,
    };
  },

  // graphiql: false // uncomment to disable GraphiQL
});
