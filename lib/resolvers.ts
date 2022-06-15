import { Person, Place, Resolvers, Role } from './resolvers-types';
import {
  canCreatePerson,
  canCreateRole,
  canViewPerson,
  canViewPlaces,
  canViewRoles,
} from './permissions';

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

      return personsDB as any;
    },
    async places(_parent, _args, _context, _info): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewPlaces(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const placesDB = await prisma.place.findMany({include: {subset: true}});
      
      return placesDB;
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
          ...(_args as any),
        },
      });
      return createdPerson as any;
    },
  },
  Person: {
    role: async ({ roleId }, _, __): Promise<Role> => {
      return (await prisma.role.findFirst({ where: { id: roleId as string } })) as any;
    },
  },
  Place: {
    superPlace: async ({
      superPlaceId,
    }): Promise<Place> => {
      return await prisma.place.findFirst({ where: { id: superPlaceId ?? "" } }) as any;
    },
  },
};

export default resolvers;
