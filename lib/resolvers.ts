import {
  Person,
  PersonFilter,
  Place,
  PlaceFilter,
  Resolvers,
  Role,
} from './resolvers-types';
import {
  canCreateEquipment,
  canCreatePerson,
  canCreatePlace,
  canCreateRole,
  canDeleteAssets,
  canDeleteEquipments,
  canDeletePersons,
  canDeletePlaces,
  canDeleteRols,
  canViewAssets,
  canViewEquipments,
  canViewPerson,
  canViewPlaces,
  canViewRoles,
} from './permissions';

import { Equipment } from '@prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/node';
import { RelatedFieldFilter } from './resolvers-types';
import { getSession } from 'next-auth/react';
import prisma from '../prisma/client';

const resolvers: Resolvers = {
  Query: {
    async persons(_, _args, _context): Promise<Person[] | any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewPerson(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { limit, offset, filters } = _args;
      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if ((e[0] === 'place' || e[0] === 'role') && 'name' in e[1]) {
              return e[1]?.name?.contains;
            } else if ('contains' in e[1]) {
              return e[1]?.contains;
            }
          })
        );

        const personsDB = await prisma.person.findMany({
          take: limit ?? 1000000,
          skip: offset ?? 0,
          include: {
            role: true,
            place: true,
          },
          where: parsedFilters,
        });

        return personsDB as any;
      }
      const personsDB = await prisma.person.findMany({
        take: limit ?? 1000000,
        skip: offset ?? 0,
        include: {
          role: true,
          place: true,
        },
      });

      return personsDB as any;
    },
    async personsCount(_, _args, _context): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewPerson(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { filters } = _args;
      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if ((e[0] === 'place' || e[0] === 'role') && 'name' in e[1]) {
              return e[1].name.contains;
            } else if ('contains' in e[1]) {
              return e[1].contains;
            }
          })
        );
        return (await prisma.person.count({ where: parsedFilters })) as number;
      }
      return (await prisma.person.count()) as number;
    },
    async places(_, _args, _context): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewPlaces(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { limit, offset, filters } = _args;
      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if (e[0] === 'isCategory') {
              return true;
            } else if (
              e[0] === 'superPlace' &&
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'name' in e[1]
            ) {
              return e[1]?.name?.contains;
            } else if (
              e[0] === 'representative' &&
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'firstNameAndLastName' in e[1]
            ) {
              return (
                e[1]?.firstNameAndLastName?.contains ||
                e[1]?.role?.name?.contains
              );
            } else if (
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'contains' in e[1]
            ) {
              return e[1]?.contains;
            }
          })
        );
        console.log(parsedFilters);

        const placesDB = await prisma.place.findMany({
          take: limit ?? 2000000,
          skip: offset ?? 0,
          include: {
            superPlace: true,
            representative: { include: { role: true } },
          },
          where: parsedFilters,
        });

        return placesDB as any;
      }
      const placesDB = await prisma.place.findMany({
        take: limit ?? 2000000,
        skip: offset ?? 0,
        include: {
          superPlace: true,
          representative: { include: { role: true } },
        },
      });

      return placesDB as any;
    },
    async placesCount(_, _args, _context): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewPlaces(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { filters } = _args;

      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if (e[0] === 'isCategory') {
              return true;
            } else if (
              e[0] === 'superPlace' &&
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'name' in e[1]
            ) {
              return e[1]?.name?.contains;
            } else if (
              e[0] === 'representative' &&
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'firstNameAndLastName' in e[1]
            ) {
              return (
                e[1]?.firstNameAndLastName?.contains ||
                e[1]?.role?.name?.contains
              );
            } else if (
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'contains' in e[1]
            ) {
              return e[1]?.contains;
            }
          })
        );

        return (await prisma.place.count({
          where: parsedFilters,
        })) as number;
      }
      return (await prisma.place.count()) as number;
    },
    async equipments(_, _args, _context): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewEquipments(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { limit, offset, filters } = _args;
      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if (e[0] === 'hasInstruncions') {
              return true;
            } else if (
              e[0] === 'supportCompany' &&
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'name' in e[1]
            ) {
              return e[1]?.name?.contains;
            } else if (
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'contains' in e[1]
            ) {
              return e[1]?.contains;
            }
          })
        );

        const equipmentsDB = await prisma.equipment.findMany({
          take: limit ?? 2000000,
          skip: offset ?? 0,
          include: {supportCompany: true},
          where: parsedFilters,
        });

        return equipmentsDB as any;
      }
      const equipmentsDB = await prisma.equipment.findMany({
        take: limit ?? 2000000,
        skip: offset ?? 0,
        include: { supportCompany: true },
      });

      return equipmentsDB as any;
    },
    async equipmentsCount(_, _args, _context): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewEquipments(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { filters } = _args;

      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if (e[0] === 'hasInstruncions') {
              return true;
            } else if (
              e[0] === 'supportCompany' &&
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'name' in e[1]
            ) {
              return e[1]?.name?.contains;
            } else if (
              typeof e[1] !== 'boolean' &&
              e[1] &&
              'contains' in e[1]
            ) {
              return e[1]?.contains;
            }
          })
        );

        return (await prisma.equipment.count({
          where: parsedFilters,
        })) as number;
      }
      return (await prisma.equipment.count()) as number;
    },
    async assets(_, _args, _context): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewAssets(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { limit, offset, filters } = _args;
      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if ((e[0] === 'equipment' || e[0] === 'place') && 'name' in e[1]) {
              return e[1]?.name?.contains;
            } else if ('contains' in e[1]) {
              return e[1]?.contains;
            }
          })
        );

        const assetsDB = await prisma.asset.findMany({
          take: limit ?? 2000000,
          skip: offset ?? 0,

          where: parsedFilters,
        });

        return assetsDB as any;
      }
      const assetsDB = await prisma.asset.findMany({
        take: limit ?? 2000000,
        skip: offset ?? 0,
      });

      return assetsDB as any;
    },
    async assetsCount(_, _args, _context): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewEquipments(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      const { filters } = _args;

      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if ((e[0] === 'equipment' || e[0] === 'place') && 'name' in e[1]) {
              return e[1]?.name?.contains;
            } else if ('contains' in e[1]) {
              return e[1]?.contains;
            }
          })
        );

        return (await prisma.asset.count({
          where: parsedFilters,
        })) as number;
      }
      return (await prisma.asset.count()) as number;
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
      _args: { limit: number; offset: number },
      _context
    ): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      return await prisma.role.findMany({
        take: _args?.limit,
        skip: _args?.offset,
        orderBy: {
          createdAt: 'asc',
        },
      });
    },
    async hasNextRole(_parent, _args: any, _context): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      const roles = await prisma.role.findMany({
        take: _args?.limit,
        skip: _args?.offset,
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
    async countAllRoles(_: any, __: any, _context: any): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canViewRoles(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      return await prisma.role.count();
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
        return editedRole;
      }
      const createdRole = await prisma.role.create({
        data: {
          name: _args.name as string,
          ..._args.permissions,
        },
      });
      return createdRole;
    },
    async createPerson(_parent, _args, _context, _info): Promise<Person> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreatePerson(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      // hash salt
      // const bcrypt = (await import("bcrypt")).default
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(_args.telephone as string, salt);
      if (_args.edit) {
        const editedPerson = await prisma.person.update({
          where: {
            id: _args.edit,
          },
          data: {
            id: _args.id as string,
            firstNameAndLastName: _args.firstNameAndLastName,
            place: { connect: { id: _args.placeId } },
            role: { connect: { id: _args.roleId } },
            address: _args.address,
            state: _args.state,
            city: _args.city,
            postalCode: _args.postalCode,
            telephone: _args.telephone,
            mobileNumber: _args.mobileNumber,
            website: _args.website,
          },
        });
        return editedPerson as any;
      }
      const createdPerson = await prisma.person.create({
        data: {
          id: _args.id as string,
          firstNameAndLastName: _args.firstNameAndLastName,
          password: _args.telephone as string,
          place: { connect: { id: _args.placeId } },
          role: { connect: { id: _args.roleId } },
          address: _args.address,
          state: _args.state,
          city: _args.city,
          postalCode: _args.postalCode,
          telephone: _args.telephone,
          mobileNumber: _args.mobileNumber,
          website: _args.website,
        },
      });
      return createdPerson as any;
    },
    async createCategory(
      _,
      { name, superPlaceId }: { name: string; superPlaceId: string },
      _context
    ): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreatePlace(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      if (superPlaceId) {
        return await (
          await prisma.place.create({
            data: {
              name,
              isCategory: true,
              superPlace: { connect: { id: superPlaceId } },
            },
          })
        ).id;
      } else {
        return await (
          await prisma.place.create({
            data: {
              name,
              isCategory: true,
            },
          })
        ).id;
      }
    },
    async createPlace(
      _,
      {
        name,
        superPlaceId,
        representativeId,
        typeOfWork,
        state,
        city,
        postalCode,
        address,
        telephone,
        mobileNumber,
        website,
        nationalId,
        economicalCode,
        registeredNumber,
        description,
        edit,
      }: any,
      _context
    ): Promise<Place> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreatePlace(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      if (edit) {
        const editedPlace = await prisma.place.update({
          where: {
            id: edit,
          },
          data: {
            name,
            typeOfWork,
            superPlace: { connect: { id: superPlaceId } },
            representative: { connect: { id: representativeId } },
            state,
            city,
            postalCode,
            address,
            telephone,
            mobileNumber,
            website,
            nationalId,
            economicalCode,
            registeredNumber,
            description,
          },
        });
        return editedPlace;
      }
      const createdPlace = await prisma.place.create({
        data: {
          name,
          typeOfWork,
          superPlace: { connect: { id: superPlaceId } },
          // representative: { connect: { id: representativeId } },
          state,
          city,
          postalCode,
          address,
          telephone,
          mobileNumber,
          website,
          nationalId,
          economicalCode,
          registeredNumber,
          description,
        },
      });
      return createdPlace;
    },
    async createEquipment(
      _,
      {
        name,
        model,
        factory,
        serialNumber,
        productionYear,
        installationYear,
        terminologyCode,
        hasInstructions,
        supportCompanyId,
        supportTelephone1,
        supportTelephone2,
        edit,
      }: any,
      _context: any
    ): Promise<Equipment> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canCreateEquipment(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      if (edit) {
        const editedEquipment = await prisma.equipment.update({
          where: {
            terminologyCode: edit,
          },
          data: {
            name,
            model,
            factory,
            serialNumber,
            productionYear,
            installationYear,
            terminologyCode,
            hasInstructions,
            supportCompany: { connect: { id: supportCompanyId } },
            supportTelephone1,
            supportTelephone2,
          },
        });
        return editedEquipment;
      }
      const createdEquipment = await prisma.equipment.create({
        data: {
          name,
          model,
          factory,
          serialNumber,
          productionYear,
          installationYear,
          terminologyCode,
          hasInstructions,
          supportCompany: { connect: { id: supportCompanyId } },
          supportTelephone1,
          supportTelephone2,
        },
      });
      return createdEquipment;
    },
    async deleteRoles(_parent, _args, _context, _info): Promise<any> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canDeleteRols(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }
      console.log(_args.roleIds);

      // with two separate queries in a transaction (all queries must succeed)
      const deletePersons = prisma.person.deleteMany({
        where: { role: { id: { in: _args.roleIds } } },
      });
      const deleteRoles = prisma.role.deleteMany({
        where: { id: { in: _args.roleIds } },
      });

      const transaction = await prisma.$transaction([
        deletePersons,
        deleteRoles,
      ]);

      return _args.roleIds;
    },
    async deletePersons(
      _: any,
      { personIds }: { personIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canDeletePersons(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      const deletedPersons = await prisma.person.deleteMany({
        where: { id: { in: personIds } },
      });
      console.log(deletedPersons);

      return deletedPersons?.count;
    },
    async deletePlaces(
      _: any,
      { placeIds }: { placeIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canDeletePlaces(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      const deletedPlaces = await prisma.place.deleteMany({
        where: { id: { in: placeIds } },
      });

      return deletedPlaces?.count;
    },
    async deleteEquipments(
      _: any,
      { equipmentIds }: { equipmentIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canDeleteEquipments(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      const deletedEquipments = await prisma.equipment.deleteMany({
        where: { terminologyCode: { in: equipmentIds } },
      });

      return deletedEquipments?.count;
    },
    async deleteAssets(
      _: any,
      { assetIds }: { assetIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission
      const { req } = _context;
      const session = await getSession({ req });
      if (!session || !(await canDeleteAssets(session))) {
        throw new GraphQLYogaError('Unauthorized');
      }

      const deletedAssets = await prisma.asset.deleteMany({
        where: { id: { in: assetIds } },
      });

      return deletedAssets?.count;
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
