import { GraphQLYogaError } from '@graphql-yoga/node';
import { Resolvers } from './resolvers-types';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import prisma from '../prisma/client';

async function canViewRoles(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewRole;
}
async function canCreateRole(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createRole;
}

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
    async roles(_parent, _args, _context, _info): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const rolesDB = await prisma.role.findMany();
      return rolesDB;
    },
  },
  Mutation: {
    async createRole(_parent, _args, _context, _info): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreateRole(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const databse = await prisma.role.create({
        data: {
          name: _args.name as string,
          ..._args.permissions,
        },
      });
      return databse;
    },
  },
};

export default resolvers;
