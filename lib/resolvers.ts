import { Resolvers } from './resolvers-types';
import prisma from '../prisma/client';
const resolvers: Resolvers = {
  Query: {
    person(_parent, _args, _context, _info): any {
      return {
        id: '1',
        firstName: 'Mehdi',
        lastName: 'Smith',
        email: '',
        title: '111',
      };
    },
  },
  Mutation: {
    async createRole(_parent, _args, _context, _info) {
      const databse = await prisma.role.create({
        data: {
          name: _args.name,
          ..._args.permissions,
        },
      });
      return databse;
    },
  },
};

export default resolvers;
