import { Resolvers } from './resolvers-types';

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
};

export default resolvers;
