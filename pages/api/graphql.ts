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
  context: async ({ req, params }) => {
    const session = await getSession({ req });
    logger.info(
      {
        type: 'request',
        operation: params.operationName,
        session,
        data: { ...params.variables },
        headers: req.headers,
      },
      `${params.operationName} graphql request`
    );

    return {
      session,
    };
  },

});
