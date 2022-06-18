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
      const placesDB = await prisma.place.findMany({
        include: { subset: true },
      });

      return placesDB;
    },
    async role(_parent: any, _args: any, _context: any): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      return await prisma.role.findFirst({ where: { id: _args.roleId } });
    },
    async roles(
      _parent,
      _args: { take: number; cursor?: string | undefined },
      _context
    ): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      if (_args.cursor) {
        return await prisma.role.findMany({
          take: _args?.take,
          skip: 1,
          cursor: {
            id: _args.cursor,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
      }
      return await prisma.role.findMany({
        take: _args?.take,
        orderBy: {
          createdAt: 'asc',
        },
      });
    },
    async hasNextRole(
      _parent,
      _args: { cursor: string },
      _context
    ): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      console.log(_args);

      if (_args.cursor) {
        const roles = await prisma.role.findMany({
          take: _args?.take,
          skip: 1,
          cursor: {
            id: _args.cursor,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
        if (!roles || roles.length === 0) return false;
        const nextRole = await prisma.role.findMany({
          take: 1,
          skip: 1,
          cursor: {
            id: roles?.[roles?.length - 1]?.id,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
        return nextRole?.length > 0;
      }
      const roles = await prisma.role.findMany({
        take: _args?.take,
        orderBy: {
          createdAt: 'asc',
        },
      });
      if (!roles || roles.length === 0) return false;
      const nextRole = await prisma.role.findMany({
        take: 1,
        skip: 1,
        cursor: {
          id: roles?.[roles?.length - 1]?.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return nextRole?.length > 0;
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
      // handle edit existing role
      if (_args.edit) {
        const editedRole = await prisma.role.update({
          where: {
            id: _args.edit,
          },
          data: {
            name: _args.name as string,
            ..._args.permissions,
          },
        });
        return editedRole as Role;

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
      return (await prisma.role.findFirst({
        where: { id: roleId as string },
      })) as any;
    },
  },
  Place: {
    superPlace: async ({ superPlaceId }): Promise<Place> => {
      return (await prisma.place.findFirst({
        where: { id: superPlaceId ?? '' },
      })) as any;
    },
  },
};

export default resolvers;
