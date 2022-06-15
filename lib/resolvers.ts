import { Person, Resolvers, Role } from './resolvers-types';
import { canCreatePerson, canCreateRole, canViewPerson, canViewRoles } from './permissions';

import { GraphQLYogaError } from '@graphql-yoga/node';
import { getSession } from 'next-auth/react';
import prisma from '../prisma/client';

const resolvers: Resolvers = {
  Query: {
    async persons(_parent, _args, _context, _info): Promise<Person[]> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewPerson(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const personsDB = await prisma.person.findMany();
      console.log(personsDB);

      return personsDB as any;
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
    async createRole(_parent, _args, _context, _info): Promise<Role> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreateRole(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const createdRole = await prisma.role.create({
        data: {
          name: _args.name as string,
          ..._args.permissions,
        },
 
      });
      return createdRole as Role;
    },
    async createPerson(_parent, _args, _context, _info): Promise<Person> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreatePerson(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const createdPerson = await prisma.person.create({
        data: {
          ..._args as any,
        },
      });
      return createdPerson as any;
    },
  },
  Person: {
    role: async ({ roleId }: { roleId: string }, _, __): Promise<Role> => {
      return (await prisma.role.findFirst({ where: { id: roleId } })) as any;
    },
  },
};

export default resolvers;
