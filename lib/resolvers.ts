import {
  AggregatedTransferedAssets,
  Asset,
  Config,
  NewTag,
  Person,
  PersonFilter,
  Place,
  PlaceFilter,
  Resolvers,
  RfidCredentials,
  Role,
  Stage,
  Tag,
  TransferedAssets,
  Workflow,
} from './resolvers-types';
import {
  canCreateAsset,
  canCreateEnterDeliverExit,
  canCreateEquipment,
  canCreateLicense,
  canCreatePerson,
  canCreatePlace,
  canCreateRole,
  canCreateTags,
  canDeleteAssets,
  canDeleteEquipments,
  canDeleteLicenses,
  canDeletePersons,
  canDeletePlaces,
  canDeleteRols,
  canEditAssets,
  canViewAssets,
  canViewEquipments,
  canViewLicenses,
  canViewPerson,
  canViewPlaces,
  canViewRoles,
} from './permissions';

import { GraphQLError } from 'graphql';
import isManager from '../src/isManager';
import logger from 'src/logger';
import prisma from '../prisma/client';
import toNestedObject from '../src/Logic/toNestedObject';

function giveMeJustAggCounts(assets: AggregatedTransferedAssets): any {
  return Object.fromEntries(
    Object.entries(assets).filter(
      ([k, v]) =>
        !/typename/.test(k) && !/factory/.test(k) && !/customer/.test(k) && v
    )
  );
}
const resolvers: Resolvers = {
  Query: {
    async persons(_, _args, _context): Promise<Person[] | any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewPerson(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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
        logger.info(
          {
            type: 'response',
            operation: 'persons',
            session: _context.session,
            response: personsDB,
          },
          'persons graphql response'
        );
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
      logger.info(
        {
          type: 'response',
          operation: 'persons',
          session: _context.session,
          response: personsDB,
        },
        'persons graphql response'
      );
      return personsDB as any;
    },
    async personsCount(_, _args, _context): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canViewPerson(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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
        const result = (await prisma.person.count({
          where: parsedFilters,
        })) as number;
        logger.info(
          {
            type: 'response',
            operation: 'personsCount',
            session: _context.session,
            response: result,
          },
          'personsCount graphql response'
        );
        return result;
      }
      const result = (await prisma.person.count()) as number;
      logger.info(
        {
          type: 'response',
          operation: 'personsCount',
          session: _context.session,
          response: result,
        },
        'personsCount graphql response'
      );
      return result;
    },
    async places(_, _args, _context): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewPlaces(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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

        const placesDB = await prisma.place.findMany({
          take: limit ?? 2000000,
          skip: offset ?? 0,
          include: {
            superPlace: true,
            representative: { include: { role: true } },
          },
          where: parsedFilters,
        });
        logger.info(
          {
            type: 'response',
            operation: 'places',
            session: _context.session,
            response: placesDB,
          },
          'places graphql response'
        );
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
      logger.info(
        {
          type: 'response',
          operation: 'places',
          session: _context.session,
          response: placesDB,
        },
        'places graphql response'
      );
      return placesDB as any;
    },
    async placesCount(_, _args, _context): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canViewPlaces(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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

        const result = (await prisma.place.count({
          where: parsedFilters,
        })) as number;
        logger.info(
          {
            type: 'response',
            operation: 'placesCount',
            session: _context.session,
            response: result,
          },
          'placesCount graphql response'
        );
        return result;
      }
      const result = (await prisma.place.count()) as number;
      logger.info(
        {
          type: 'response',
          operation: 'placesCount',
          session: _context.session,
          response: result,
        },
        'placesCount graphql response'
      );
      return result;
    },
    async equipments(_, _args, _context): Promise<any> {
      // check authentication and permission
      //
      //
      // if (!_context?.session || !(await canViewEquipments(_context?.session))) {
      //   throw new GraphQLError('Not authenticated or authorized');
      // }
      const { limit, offset, filters } = _args;
      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if (e[0] === 'hasInstructions') {
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

        const equipmentsDB: any = await prisma.equipment.findMany({
          take: limit ?? 2000000,
          skip: offset ?? 0,
          include: {
            supportCompany: true,
            assets: {
              where: { status: 'موجود در بیمارستان' },
              select: { id: true },
            },
          },
          where: parsedFilters,
        });

        const result = equipmentsDB?.map((e: any) => ({
          ...e,
          available: e?.assets?.length ?? 0,
        })) as any;

        logger.info(
          {
            type: 'response',
            operation: 'equipments',
            session: _context.session,
            response: result,
          },
          'equipments graphql response'
        );
        return result;
      }
      const equipmentsDB = await prisma.equipment.findMany({
        take: limit ?? 2000000,
        skip: offset ?? 0,
        include: {
          supportCompany: true,
          assets: {
            where: { status: 'موجود در بیمارستان' },
            select: { id: true },
          },
        },
      });

      const result = equipmentsDB?.map((e: any) => ({
        ...e,
      })) as any;

      logger.info(
        {
          type: 'response',
          operation: 'equipments',
          session: _context.session,
          response: result,
        },
        'equipments graphql response'
      );
      return result;
    },
    async equipmentsCount(_, _args, _context): Promise<number> {
      // check authentication and permission
      //
      //
      // if (!_context?.session || !(await canViewEquipments(_context?.session))) {
      //   throw new GraphQLError('Not authenticated or authorized');
      // }
      const { filters } = _args;

      if (filters) {
        const parsedFilters = Object.fromEntries(
          Object.entries(filters).filter((e) => {
            if (e[0] === 'hasInstructions') {
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

        const result = (await prisma.equipment.count({
          where: parsedFilters,
        })) as number;
        logger.info(
          {
            type: 'response',
            operation: 'equipmentsCount',
            session: _context.session,
            response: result,
          },
          'equipmentsCount graphql response'
        );
        return result;
      }
      const result = (await prisma.equipment.count()) as number;
      logger.info(
        {
          type: 'response',
          operation: 'equipmentsCount',
          session: _context.session,
          response: result,
        },
        'equipmentsCount graphql response'
      );
      return result;
    },
    async assets(_, _args, _context): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewAssets(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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
          include: { equipment: true, place: true, tag: true },
          where: parsedFilters,
        });
        logger.info(
          {
            type: 'response',
            operation: 'assets',
            session: _context.session,
            response: assetsDB,
          },
          'assets graphql response'
        );
        return assetsDB as any;
      }
      const assetsDB = await prisma.asset.findMany({
        take: limit ?? 2000000,
        skip: offset ?? 0,
        include: { equipment: true, place: true, tag: true },
      });
      logger.info(
        {
          type: 'response',
          operation: 'assets',
          session: _context.session,
          response: assetsDB,
        },
        'assets graphql response'
      );
      return assetsDB as any;
    },
    async assetsCount(_, _args, _context): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canViewEquipments(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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

        const result = (await prisma.asset.count({
          where: parsedFilters,
        })) as number;

        logger.info(
          {
            type: 'response',
            operation: 'assetsCount',
            session: _context.session,
            response: result,
          },
          'assetsCount graphql response'
        );
        return result;
      }
      const result = (await prisma.asset.count()) as number;
      logger.info(
        {
          type: 'response',
          operation: 'assetsCount',
          session: _context.session,
          response: result,
        },
        'assetsCount graphql response'
      );
      return result;
    },
    async assetTransferWorkflows(_, _args, _context): Promise<any> {
      // check authentication and permission

      if (
        !_context?.session ||
        (!(await canViewLicenses(_context?.session)) &&
          !(await canCreateEnterDeliverExit(_context?.session)))
      ) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      let {
        limit,
        offset,
        filters,
      }: { limit?: any; offset?: any; filters?: any } = _args;
      if (filters?.nsn) {
        filters.nextStageName = filters?.nsn;
        filters = Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => key !== 'nsn')
        );
      }

      const workflows = await prisma.workflow.findMany({
        take: limit ?? 2000000,
        skip: offset ?? 0,
        where: _context?.session?.user?.role?.createEnterDeliverExit
          ? toNestedObject({
              ...filters,
              'passedStages.some.havaleh.is.corporation.is.id':
                _context?.session?.user?.place?.id,
            })
          : filters,
        orderBy: { dateCreated: 'desc' },
        include: { instanceOfProcess: true },
      });

      // workflows?.forEach((w) => {
      //   if (w?.passedStages?.[3]?.havaleh?.assets) {
      //     w.passedStages[3].havaleh.contradiction = true
      //   }
      // });
      logger.info(
        {
          type: 'response',
          operation: 'assetTransferWorkflows',
          session: _context.session,
          response: workflows,
        },
        'assetTransferWorkflows graphql response'
      );
      return workflows;
    },
    async assetTransferWorkflowsCount(_, _args, _context): Promise<number> {
      // check authentication and permission

      if (
        !_context?.session ||
        (!(await canViewLicenses(_context?.session)) &&
          !(await canCreateEnterDeliverExit(_context?.session)))
      ) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      let { filters }: { filters?: any } = _args;
      if (filters?.nsn) {
        filters.nextStageName = filters?.nsn;
        filters = Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => key !== 'nsn')
        );
      }
      const result = (await prisma.workflow.count({
        where: _context?.session?.user?.role?.createEnterDeliverExit
          ? toNestedObject({
              ...filters,
              'passedStages.some.havaleh.is.corporation.is.id':
                _context?.session?.user?.place?.id,
            })
          : filters,
      })) as number;

      logger.info(
        {
          type: 'response',
          operation: 'assetTransferWorkflowsCount',
          session: _context.session,
          response: result,
        },
        'assetTransferWorkflowsCount graphql response'
      );
      return result;
    },
    async role(_parent: any, _args: any, _context: any): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewRoles(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const result = await prisma.role.findFirst({
        where: { id: _args.roleId },
      });
      logger.info(
        {
          type: 'response',
          operation: 'role',
          session: _context.session,
          response: result,
        },
        'role graphql response'
      );
      return result;
    },
    async roles(
      _parent,
      _args: { limit: number; offset: number },
      _context
    ): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewRoles(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const result = await prisma.role.findMany({
        take: _args?.limit,
        skip: _args?.offset,
        orderBy: {
          createdAt: 'asc',
        },
      });
      logger.info(
        {
          type: 'response',
          operation: 'roles',
          session: _context.session,
          response: result,
        },
        'roles graphql response'
      );
      return result;
    },
    async hasNextRole(_parent, _args: any, _context): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewRoles(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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
      logger.info(
        {
          type: 'response',
          operation: 'hasNextRole',
          session: _context.session,
          response: nextRole?.length > 0,
        },
        'hasNextRole graphql response'
      );
      return nextRole?.length > 0;
    },
    async countAllRoles(_: any, __: any, _context: any): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewRoles(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const result = await prisma.role.count();
      logger.info(
        {
          type: 'response',
          operation: 'countAllRoles',
          session: _context.session,
          response: result,
        },
        'countAllRoles graphql response'
      );
      return result;
    },
    async getWorkflowNumber(_: any, __: any, _context: any): Promise<string> {
      // check authentication and permission

      if (!_context?.session || !(await canViewLicenses(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const newNumber =
        parseInt(
          (
            await prisma.workflow.findMany({ orderBy: { dateCreated: 'desc' } })
          ).shift()?.workflowNumber ?? '0'
        ) + 1;

      const result = newNumber.toString();
      logger.info(
        {
          type: 'response',
          operation: 'getWorkflowNumber',
          session: _context.session,
          response: result,
        },
        'getWorkflowNumber graphql response'
      );
      return result;
    },
    async tagData(
      _: any,
      { tagId }: { tagId: string },
      _context: any
    ): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canViewAssets(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const result = await prisma.tag.findUnique({
        where: { id: tagId },
        include: { asset: { include: { equipment: true } } },
      });
      logger.info(
        {
          type: 'response',
          operation: 'tagData',
          session: _context.session,
          response: result,
        },
        'tagData graphql response'
      );
      return result;
    },
    async getCurrentConfig(_, __, _context): Promise<Config | null> {
      // check authentication and permission

      // manager detection
      if (!_context?.session || !isManager(_context?.session)) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const result = await prisma.config.findFirst({
        where: { current: true },
      });
      logger.info(
        {
          type: 'response',
          operation: 'getCurrentConfig',
          session: _context.session,
          response: result,
        },
        'getCurrentConfig graphql response'
      );
      return result;
    },
    async giveMeRFIDCredentials(
      _,
      __,
      _context
    ): Promise<RfidCredentials | null> {
      // check authentication and permission

      if (!_context?.session || !(await canCreateTags(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const credentials = {
        host: process.env.NEXT_PUBLIC_MQTT_BROKER_URL,
        port: process.env.NEXT_PUBLIC_MQTT_BROKER_PORT,
        username: process.env.NEXT_PUBLIC_MQTT_BROKER_USERNAME,
        password: process.env.NEXT_PUBLIC_MQTT_BROKER_PASSWORD,
        useSSL: Boolean(
          parseInt(process.env.NEXT_PUBLIC_MQTT_BROKER_SSL ?? '0')
        ),
      };
      logger.info(
        {
          type: 'response',
          operation: 'giveMeRFIDCredentials',
          session: _context.session,
          response: credentials,
        },
        'giveMeRFIDCredentials graphql response'
      );
      return credentials;
    },
  },
  Mutation: {
    async createRole(_parent, _args, _context, _info): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canCreateRole(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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
        logger.info(
          {
            type: 'response',
            operation: 'createRole',
            session: _context.session,
            response: editedRole,
          },
          'createRole graphql response'
        );
        return editedRole;
      }
      const createdRole = await prisma.role.create({
        data: {
          name: _args.name as string,
          ..._args.permissions,
        },
      });
      logger.info(
        {
          type: 'response',
          operation: 'createRole',
          session: _context.session,
          response: createdRole,
        },
        'createRole graphql response'
      );
      return createdRole;
    },
    async createPerson(_parent, _args, _context, _info): Promise<Person> {
      // check authentication and permission

      if (!_context?.session || !(await canCreatePerson(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      // hash salt
      // const bcrypt = (await import("bcrypt")).default
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(_args.telephone as string, salt);
      if (_args?.edit) {
        const editedPerson = await prisma.person.update({
          where: {
            id: _args.edit,
          },
          data: {
            // id: _args.id,
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
        logger.info(
          {
            type: 'response',
            operation: 'createPerson',
            session: _context.session,
            response: editedPerson,
          },
          'createPerson graphql response'
        );
        return editedPerson as any;
      }

      if (_args?.newPlace) {
        if (!_context?.session || !(await canCreatePlace(_context?.session))) {
          throw new GraphQLError('Not authenticated or authorized');
        }
        const createdPlace = prisma.place.create({
          data: {
            name: _args?.newPlace?.name,
            typeOfWork: _args?.newPlace?.typeOfWork,
            state: _args?.newPlace?.state,
            city: _args?.newPlace?.city,
            postalCode: _args?.newPlace?.postalCode,
            address: _args?.newPlace?.address,
            telephone: _args?.newPlace?.telephone,
            mobileNumber: _args?.newPlace?.mobileNumber,
            website: _args?.newPlace?.website,
            nationalId: _args?.newPlace?.nationalId,
            economicalCode: _args?.newPlace?.economicalCode,
            registeredNumber: _args?.newPlace?.registeredNumber,
            description: _args?.newPlace?.description,
          },
        });
        const createdPerson = prisma.person.create({
          data: {
            id: _args.id as string,
            firstNameAndLastName: _args.firstNameAndLastName,
            password: _args.telephone as string,
            place: { connect: { name: _args?.newPlace?.name } },
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
        const connectedPlaceToPerson = prisma.place.update({
          where: { name: _args?.newPlace?.name },
          data: {
            representative: { connect: { id: _args.id as string } },
          },
        });
        const transaction = await prisma.$transaction([
          createdPlace,
          createdPerson,
          connectedPlaceToPerson,
        ]);
        logger.info(
          {
            type: 'response',
            operation: 'createPerson',
            session: _context.session,
            response: transaction,
          },
          'createPerson graphql response'
        );
        return transaction?.[1] as any;
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
      logger.info(
        {
          type: 'response',
          operation: 'createPerson',
          session: _context.session,
          response: createdPerson,
        },
        'createPerson graphql response'
      );
      return createdPerson as any;
    },
    async createCategory(_, { name, superPlaceId }, _context): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canCreatePlace(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
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
      },
      _context
    ): Promise<Place> {
      // check authentication and permission

      if (!_context?.session || !(await canCreatePlace(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      if (edit) {
        const editedPlace = await prisma.place.update({
          where: {
            id: edit,
          },
          data: {
            name,
            typeOfWork,
            representative: { connect: { id: representativeId as string } },
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
        logger.info(
          {
            type: 'response',
            operation: 'createPlace',
            session: _context.session,
            response: editedPlace,
          },
          'createPlace graphql response'
        );
        return editedPlace;
      }
      if (superPlaceId) {
        const createdPlace = await prisma.place.create({
          data: {
            name,
            typeOfWork,
            superPlace: { connect: { id: superPlaceId } },
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
        logger.info(
          {
            type: 'response',
            operation: 'createPlace',
            session: _context.session,
            response: createdPlace,
          },
          'createPlace graphql response'
        );
        return createdPlace;
      } else {
        const createdPlace = await prisma.place.create({
          data: {
            name,
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
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'createPlace',
            session: _context.session,
            response: createdPlace,
          },
          'createPlace graphql response'
        );
        return createdPlace;
      }
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
    ): Promise<any> {
      // check authentication and permission

      if (
        !_context?.session ||
        !(await canCreateEquipment(_context?.session))
      ) {
        throw new GraphQLError('Not authenticated or authorized');
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
            // terminologyCode,
            hasInstructions,
            supportCompany: { connect: { id: supportCompanyId } },
            supportTelephone1,
            supportTelephone2,
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'createEquipment',
            session: _context.session,
            response: editedEquipment,
          },
          'createEquipment graphql response'
        );
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
          outsourced: 0,
          sending: 0,
          receiving: 0,
          available: 0,
        },
      });
      logger.info(
        {
          type: 'response',
          operation: 'createEquipment',
          session: _context.session,
          response: createdEquipment,
        },
        'createEquipment graphql response'
      );
      return createdEquipment;
    },
    async createAsset(
      _,
      { equipmentId, placeId, count, edit },
      _context: any
    ): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canCreateAsset(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      if (edit) {
        const editedAsset = await prisma.asset.update({
          where: {
            id: edit,
          },
          data: {
            equipment: { connect: { terminologyCode: equipmentId } },
            place: { connect: { id: placeId } },
            status: 'موجود در بیمارستان',
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'createAsset',
            session: _context.session,
            response: 1,
          },
          'createAsset graphql response'
        );
        return 1;
      }
      count = count ?? 1;
      let a = [];
      for (let i = 0; i < count; i++) {
        a.push({
          equipmentId,
          placeId,
          status: 'موجود در بیمارستان',
        });
      }
      const resp = await prisma.asset.createMany({
        data: a,
      });
      logger.info(
        {
          type: 'response',
          operation: 'createAsset',
          session: _context.session,
          response: resp,
        },
        'createAsset graphql response'
      );
      return resp?.count;
    },
    async deleteRoles(_parent, _args, _context, _info): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canDeleteRols(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

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
      logger.info(
        {
          type: 'response',
          operation: 'deleteRoles',
          session: _context.session,
          response: transaction,
        },
        'deleteRoles graphql response'
      );
      return _args.roleIds;
    },
    async deletePersons(
      _: any,
      { personIds }: { personIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canDeletePersons(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const deletedPersons = await prisma.person.deleteMany({
        where: { id: { in: personIds } },
      });
      logger.info(
        {
          type: 'response',
          operation: 'deletePersons',
          session: _context.session,
          response: deletedPersons,
        },
        'deletePersons graphql response'
      );
      return deletedPersons?.count;
    },
    async deletePlaces(
      _: any,
      { placeIds }: { placeIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canDeletePlaces(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const deletedPlaces = await prisma.place.deleteMany({
        where: { id: { in: placeIds } },
      });
      logger.info(
        {
          type: 'response',
          operation: 'deletePlaces',
          session: _context.session,
          response: deletedPlaces,
        },
        'deletePlaces graphql response'
      );
      return deletedPlaces?.count;
    },
    async deleteEquipments(
      _: any,
      { equipmentIds }: { equipmentIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission

      if (
        !_context?.session ||
        !(await canDeleteEquipments(_context?.session)) ||
        canNotDeleteThisEquipment()
      ) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const deletedEquipments = await prisma.equipment.deleteMany({
        where: { terminologyCode: { in: equipmentIds } },
      });
      logger.info(
        {
          type: 'response',
          operation: 'deleteEquipments',
          session: _context.session,
          response: deletedEquipments,
        },
        'deleteEquipments graphql response'
      );
      return deletedEquipments?.count;

      function canNotDeleteThisEquipment(): boolean {
        for (const i of [
          'oxygen_50l',
          'co2_50l, azete_50l',
          'bihoshi_50l',
          'oxygen_40l',
          'co2_40l, azete_40l',
          'bihoshi_40l',
        ]) {
          if (equipmentIds.includes(i)) {
            return true;
          }
        }
        return false;
      }
    },
    async deleteAssets(
      _: any,
      { assetIds }: { assetIds: string[] },
      _context: any
    ): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canDeleteAssets(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const deletedAssets = await prisma.asset.deleteMany({
        where: { id: { in: assetIds } },
      });
      logger.info(
        {
          type: 'response',
          operation: 'deleteAssets',
          session: _context.session,
          response: deletedAssets,
        },
        'deleteAssets graphql response'
      );
      return deletedAssets?.count;
    },
    async deleteWorkflows(
      _: any,
      { workflowIds },
      _context: any
    ): Promise<number> {
      // check authentication and permission

      if (!_context?.session || !(await canDeleteLicenses(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const deletedWorkflows = await prisma.workflow.deleteMany({
        where: { workflowNumber: { in: workflowIds } },
      });
      logger.info(
        {
          type: 'response',
          operation: 'deleteWorkflows',
          session: _context.session,
          response: deletedWorkflows,
        },
        'deleteWorkflows graphql response'
      );
      return deletedWorkflows?.count;
    },
    async createEnterWorkflow(
      _,
      {
        workflowNumber,
        havalehId,
        deliverer,
        description,
        receiver,
        receiverTelephone,
        transportationName,
        transportationTelephone,
        transportationTelephone2,
        corporationRepresentativeId,
        assets,
      },
      _context: any
    ): Promise<string> {
      // check authentication and permission

      if (
        !_context?.session ||
        (!(await canCreateEnterDeliverExit(_context?.session)) &&
          !(await canCreateLicense(_context?.session)))
      ) {
        throw new GraphQLError('خطا');
      } else if (await repetitiveHavalehId(havalehId)) {
        throw new GraphQLError('شماره حواله تکراری');
      }
      // // new assets that must be created
      // const factoryAssets = Object.entries(assets)
      //   .filter(([key, value]) => /factory/.test(key))
      //   .map(([key, value]) => [key.replace('_factory', ''), value]);

      // factoryAssets.forEach(async ([key, value]) => {
      //   const existingEquipment = await prisma.equipment.findUnique({
      //     where: { terminologyCode: key as string },
      //   });

      //   const ur = await prisma.equipment.update({
      //     where: {
      //       terminologyCode: key as string,
      //     },
      //     data: {
      //       state: {
      //         ...existingEquipment?.state,
      //         sendOrReceive: {
      //           ...existingEquipment?.state?.sendOrReceive,
      //           trust: existingEquipment?.state?.sendOrReceive?.trust
      //             ? [
      //                 ...existingEquipment?.state?.sendOrReceive?.trust.filter(
      //                   (t) =>
      //                     t.debatorCorportionId !== _context?.session?.user?.place?.id
      //                 ),
      //                 {
      //                   debatorCorportionId: _context?.session?.user?.place?.id,
      //                   sum:
      //                     (existingEquipment?.state?.sendOrReceive?.trust?.find(
      //                       (t) =>
      //                         t.debatorCorportionId === _context?.session?.user?.place?.id
      //                     )?.sum ?? 0) + (value as number),
      //                 },
      //               ]
      //             : [
      //                 {
      //                   debatorCorportionId: _context?.session?.user?.place?.id,
      //                   sum: value,
      //                 },
      //               ],
      //         },
      //       },
      //     },
      //   });
      // });
      // // hospital assets that have been borrowed by the corporation
      // const customerAssets = Object.entries(assets)
      //   .filter(([key, value]) => /customer/.test(key))
      //   .map(([key, value]) => [key.replace('_customer', ''), value]);
      // customerAssets.forEach(async ([key, value]) => {
      //   const existingEquipment = await prisma.equipment.findUnique({
      //     where: { terminologyCode: key as string },
      //   });
      //   await prisma.equipment.update({
      //     where: {
      //       terminologyCode: key as string,
      //     },
      //     data: {
      //       state: {
      //         ...existingEquipment?.state,
      //         sendOrReceive: {
      //           ...existingEquipment?.state?.sendOrReceive,
      //           own: existingEquipment?.state?.sendOrReceive?.own
      //             ? existingEquipment?.state?.sendOrReceive?.own +
      //               (value as number)
      //             : (value as number),
      //         },
      //         outsourced: {
      //           own: existingEquipment?.state?.outsourced?.own
      //             ? existingEquipment?.state?.outsourced?.own -
      //               (value as number)
      //             : 0,
      //         },
      //       },
      //     },
      //   });
      // });
      const aggregatedAssets: any = {};
      Object.entries(assets as TransferedAssets)
        .map(([key, value]) => [
          key.replace('_factory', '').replace('_customer', ''),
          value,
        ])
        ?.forEach(([k, v]) => {
          aggregatedAssets[String(k)] = aggregatedAssets[String(k)]
            ? aggregatedAssets[String(k)] + v
            : v;
        });
      //  update state of equipments
      const o: any = [];
      Object.entries(aggregatedAssets)
        .filter(([k, v]) => v && !/factory/.test(k) && !/customer/.test(k))
        .forEach(([k, v]) => {
          o.push(
            prisma.equipment.update({
              where: { terminologyCode: k },
              data: {
                receiving: { increment: v as number },
              },
            })
          );
        });
      // new enter workflow
      const createdWorkflow = prisma.workflow.create({
        data: {
          workflowNumber:
            workflowNumber ??
            (
              parseInt(
                (
                  await prisma.workflow.findMany({
                    orderBy: { dateCreated: 'desc' },
                  })
                ).shift()?.workflowNumber ?? '0'
              ) + 1
            ).toString(),
          instanceOfProcess: { connect: { processNumber: 1 } },
          nextStageName: 'تایید تحویل کپسول به بیمارستان',
          passedStages: [
            {
              stageID: 1,
              stageName: 'ثبت خروج کپسول از شرکت',
              submittedByUser: {
                id: _context?.session?.user?.id,
                firstNameAndLastName:
                  _context?.session?.user?.firstNameAndLastName,
                role: _context?.session?.user?.role?.name,
              },

              havaleh: {
                id: havalehId,
                deliverer,
                transportationName,
                transportationTelephone,
                transportationTelephone2,
                receiver,
                receiverTelephone,
                description,
                corporation: {
                  id: _context?.session?.user?.place?.id ?? '',
                  name: _context?.session?.user?.place?.name ?? '',
                },
                assets: { ...assets, ...aggregatedAssets },
              },
            },
          ],
        },
      });

      const t = await prisma.$transaction([...o, createdWorkflow]);
      logger.info(
        {
          type: 'response',
          operation: 'createEnterWorkflow',
          session: _context.session,
          response: t,
        },
        'createEnterWorkflow graphql response'
      );
      return t?.[1]?.id ?? '';
    },
    async createExitWorkflow(
      _,
      {
        workflowNumber,
        havalehId,
        description,
        receiver,
        receiverTelephone,
        transportationName,
        transportationTelephone,
        transportationTelephone2,
        corporationRepresentativeId,
        deliverer,
        assets,
      },
      _context: any
    ): Promise<any> {
      // check authentication and permission

      if (
        !_context?.session ||
        !(await canCreateEquipment(_context?.session))
      ) {
        throw new GraphQLError('خطا');
      } else if (await repetitiveHavalehId(havalehId)) {
        throw new GraphQLError('شماره حواله تکراری');
      }
      const aggregatedAssets: any = {};
      Object.entries(assets as any)
        .map(([key, value]) => [
          key.replace('_factory', '').replace('_customer', ''),
          value,
        ])
        .forEach(
          ([k, v]) =>
            (aggregatedAssets[String(k)] = aggregatedAssets[String(k)]
              ? aggregatedAssets[String(k)] + v
              : v)
        );
      const currentConfig = await prisma.config.findFirst({
        where: { current: true },
      });
      const o: any = [];

      // new exit workflow
      if (currentConfig?.ignoreManagerApproval && currentConfig?.ignoreRFID) {
        Object.entries(aggregatedAssets).forEach(([k, v]) => {
          o.push(
            prisma.equipment.update({
              where: { terminologyCode: k },
              data: {
                sending: { increment: v as number },
                available: { decrement: v as number },
              },
            })
          );
        });
        const w = prisma.workflow.create({
          data: {
            workflowNumber: await autoIncrementId(),
            instanceOfProcess: { connect: { processNumber: 2 } },
            nextStageName: 'تایید تحویل به شرکت',
            passedStages: [
              {
                stageID: 1,
                stageName: 'درخواست خروج از بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  id: havalehId,
                  transportationName,
                  transportationTelephone,
                  transportationTelephone2,
                  deliverer,
                  description,
                  receiver,
                  receiverTelephone,
                  corporation: {
                    id: corporationRepresentativeId,
                    name:
                      (
                        await prisma.place.findFirst({
                          where: { id: corporationRepresentativeId },
                        })
                      )?.name ?? 'unknown',
                  },
                  assets: { ...assets, ...aggregatedAssets },
                },
              },
              {
                stageID: 2,
                stageName: 'قبول درخواست توسط مدیریت',
                submittedByUser: {
                  id:
                    (
                      await prisma.person.findFirst({
                        where: { role: { name: 'مدیریت' } },
                      })
                    )?.id ?? 'unknown',
                  firstNameAndLastName:
                    (
                      await prisma.person.findFirst({
                        where: { role: { name: 'مدیریت' } },
                      })
                    )?.firstNameAndLastName ?? 'unknown',
                  role: 'مدیریت',
                },
              },
              {
                stageID: 3,
                stageName: 'RFID ثبت خروج کپسول از انبار توسط',
                submittedByUser: {
                  id:
                    (
                      await prisma.person.findFirst({
                        where: { role: { name: 'مدیریت' } },
                      })
                    )?.id ?? 'unknown',
                  firstNameAndLastName:
                    (
                      await prisma.person.findFirst({
                        where: { role: { name: 'مدیریت' } },
                      })
                    )?.firstNameAndLastName ?? 'unknown',
                  role: 'مدیریت',
                },
                havaleh: {
                  assets: { ...aggregatedAssets },
                },
              },
            ],
          },
        });
        const t = await prisma.$transaction([w, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'createExitWorkflow',
            session: _context.session,
            response: t,
          },
          'createExitWorkflow graphql response'
        );
        return t[0];
      } else if (
        currentConfig?.ignoreManagerApproval &&
        !currentConfig?.ignoreRFID
      ) {
        const t = await prisma.workflow.create({
          data: {
            workflowNumber: await autoIncrementId(),
            instanceOfProcess: { connect: { processNumber: 2 } },
            nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
            passedStages: [
              {
                stageID: 1,
                stageName: 'درخواست خروج از بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  id: havalehId,
                  transportationName,
                  transportationTelephone,
                  transportationTelephone2,
                  deliverer,
                  description,
                  receiver,
                  receiverTelephone,
                  corporation: {
                    id: corporationRepresentativeId,
                    name:
                      (
                        await prisma.place.findFirst({
                          where: { id: corporationRepresentativeId },
                        })
                      )?.name ?? 'unknown',
                  },
                  assets: { ...assets, ...aggregatedAssets },
                },
              },
              {
                stageID: 2,
                stageName: 'قبول درخواست توسط مدیریت',
                submittedByUser: {
                  id:
                    (
                      await prisma.person.findFirst({
                        where: { role: { name: 'مدیریت' } },
                      })
                    )?.id ?? 'unknown',
                  firstNameAndLastName:
                    (
                      await prisma.person.findFirst({
                        where: { role: { name: 'مدیریت' } },
                      })
                    )?.firstNameAndLastName ?? 'unknown',
                  role: 'مدیریت',
                },
              },
            ],
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'createExitWorkflow',
            session: _context.session,
            response: t,
          },
          'createExitWorkflow graphql response'
        );
        return t;
      } else if (!currentConfig?.ignoreManagerApproval) {
        const t = await prisma.workflow.create({
          data: {
            workflowNumber: await autoIncrementId(),
            instanceOfProcess: { connect: { processNumber: 2 } },
            nextStageName: 'قبول درخواست توسط مدیریت',
            passedStages: [
              {
                stageID: 1,
                stageName: 'درخواست خروج از بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  id: havalehId,
                  transportationName,
                  transportationTelephone,
                  transportationTelephone2,
                  deliverer,
                  description,
                  receiver,
                  receiverTelephone,
                  corporation: {
                    id: corporationRepresentativeId,
                    name:
                      (
                        await prisma.place.findFirst({
                          where: { id: corporationRepresentativeId },
                        })
                      )?.name ?? 'unknown',
                  },
                  assets: { ...assets, ...aggregatedAssets },
                },
              },
            ],
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'createExitWorkflow',
            session: _context.session,
            response: t,
          },
          'createExitWorkflow graphql response'
        );
        return t;
      }

      async function autoIncrementId(): Promise<string> {
        return (
          parseInt(
            (
              await prisma.workflow.findMany({
                orderBy: { dateCreated: 'desc' },
              })
            ).shift()?.workflowNumber ?? '0'
          ) + 1
        ).toString();
      }
    },
    async confirmReceiptByHospital(
      _,
      {
        workflowNumber,
        havalehId,
        deliverer,
        description,
        receivingDescription,
        transportationName,
        transportationTelephone,
        transportationTelephone2,
        assets,
      },
      _context: any
    ): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canCreateLicense(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const existingWorkflow = await prisma.workflow.findUnique({
        where: { workflowNumber },
      });
      const currentConfig = await prisma.config.findFirst({
        where: { current: true },
      });
      const o: any = [];
      Object.entries(
        giveMeJustAggCounts(
          existingWorkflow?.passedStages?.[0]?.havaleh?.assets as any
        )
      ).forEach(([k, v]) => {
        o.push(
          prisma.equipment.update({
            where: { terminologyCode: k },
            data: {
              receiving: { decrement: v as number },
              available: { increment: v as number },
            },
          })
        );
      });

      // update enter workflow
      if (havalehId && !currentConfig?.ignoreRFID) {
        const updatedWorkflow = prisma.workflow.update({
          where: {
            workflowNumber,
          },
          data: {
            nextStageName: 'RFID ثبت ورود کپسول به انبار توسط',
            passedStages: [
              existingWorkflow?.passedStages?.[0] as any,
              {
                stageID: 2,
                stageName: 'تایید تحویل کپسول به بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },

                havaleh: {
                  id: havalehId + 'edited',
                  deliverer,
                  transportationName,
                  transportationTelephone,
                  transportationTelephone2,
                  description,
                  receivingDescription,
                  contradiction: true,
                  assets:
                    assets ||
                    existingWorkflow?.passedStages?.[0]?.havaleh?.assets,
                },
              },
            ],
          },
        });
        const transaction = await prisma.$transaction([updatedWorkflow, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'confirmReceiptByHospital',
            session: _context.session,
            response: transaction,
          },
          'confirmReceiptByHospital graphql response'
        );
        return transaction[0];
      } else if (havalehId && currentConfig?.ignoreRFID) {
        const updatedWorkflow = prisma.workflow.update({
          where: {
            workflowNumber,
          },
          data: {
            nextStageName: '',
            passedStages: [
              existingWorkflow?.passedStages?.[0] as any,
              {
                stageID: 2,
                stageName: 'تایید تحویل کپسول به بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  id: havalehId + 'edited',
                  deliverer,
                  transportationName,
                  transportationTelephone,
                  transportationTelephone2,
                  description,
                  receivingDescription,
                  contradiction: true,
                  assets:
                    assets ||
                    existingWorkflow?.passedStages?.[0]?.havaleh?.assets,
                },
              },
              {
                stageID: 3,
                stageName: 'RFID ثبت ورود کپسول به انبار توسط',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  assets:
                    assets ||
                    existingWorkflow?.passedStages?.[0]?.havaleh?.assets,
                },
              },
            ],
          },
        });
        const transaction = await prisma.$transaction([updatedWorkflow, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'confirmReceiptByHospital',
            session: _context.session,
            response: transaction,
          },
          'confirmReceiptByHospital graphql response'
        );
        return transaction[0];
      } else if (!havalehId && !currentConfig?.ignoreRFID) {
        const updatedWorkflow = prisma.workflow.update({
          where: {
            workflowNumber,
          },
          data: {
            nextStageName: 'RFID ثبت ورود کپسول به انبار توسط',
            passedStages: [
              existingWorkflow?.passedStages?.[0] as any,
              {
                stageID: 2,
                stageName: 'تایید تحویل کپسول به بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  receivingDescription,
                },
              },
            ],
          },
        });
        const transaction = await prisma.$transaction([updatedWorkflow, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'confirmReceiptByHospital',
            session: _context.session,
            response: transaction,
          },
          'confirmReceiptByHospital graphql response'
        );
        return transaction[0];
      } else if (!havalehId && currentConfig?.ignoreRFID) {
        const updatedWorkflow = prisma.workflow.update({
          where: {
            workflowNumber,
          },
          data: {
            nextStageName: '',
            passedStages: [
              existingWorkflow?.passedStages?.[0] as any,
              {
                stageID: 2,
                stageName: 'تایید تحویل کپسول به بیمارستان',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  receivingDescription,
                },
              },
              {
                stageID: 3,
                stageName: 'RFID ثبت ورود کپسول به انبار توسط',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  assets: existingWorkflow?.passedStages?.[0]?.havaleh?.assets,
                },
              },
            ],
          },
        });
        const transaction = await prisma.$transaction([updatedWorkflow, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'confirmReceiptByHospital',
            session: _context.session,
            response: transaction,
          },
          'confirmReceiptByHospital graphql response'
        );
        return transaction[0];
      }
    },
    async confirmReceiptByCorporation(
      _,
      {
        workflowNumber,
        havalehId,
        deliverer,
        description,
        receivingDescription,
        transportationName,
        transportationTelephone,
        transportationTelephone2,
        assets,
      },
      _context: any
    ): Promise<any> {
      // check authentication and permission

      if (
        !_context?.session ||
        !(await canCreateEnterDeliverExit(_context?.session))
      ) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const existingWorkflow = (await prisma.workflow.findUnique({
        where: { workflowNumber },
      })) as any;

      const o: any = [];
      Object.entries(
        existingWorkflow?.passedStages?.[2]?.havaleh?.assets as any
      )
        .filter(([k, v]) => v)
        .forEach(([k, v]) => {
          o.push(
            prisma.equipment.update({
              where: { terminologyCode: k },
              data: {
                sending: { decrement: v as number },
                outsourced: { increment: v as number },
              },
            })
          );
        });
      // update enter workflow
      if (havalehId) {
        const updatedWorkflow = prisma.workflow.update({
          where: {
            workflowNumber,
          },
          data: {
            nextStageName: '',
            passedStages: [
              ...existingWorkflow?.passedStages,
              {
                stageID: 4,
                stageName: 'تایید تحویل به شرکت',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  id: havalehId + 'edited',
                  deliverer,
                  transportationName,
                  transportationTelephone,
                  transportationTelephone2,
                  description,
                  receivingDescription,
                  contradiction: true,
                  assets:
                    assets ||
                    existingWorkflow?.passedStages?.[0]?.havaleh?.assets,
                },
              },
            ],
          },
        });
        const t = await prisma.$transaction([updatedWorkflow, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'confirmReceiptByCorporation',
            session: _context.session,
            response: t,
          },
          'confirmReceiptByCorporation graphql response'
        );
        return t[0];
      } else {
        const updatedWorkflow = prisma.workflow.update({
          where: {
            workflowNumber,
          },
          data: {
            nextStageName: '',
            passedStages: [
              ...existingWorkflow?.passedStages,
              {
                stageID: 4,
                stageName: 'تایید تحویل به شرکت',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  receivingDescription,
                },
              },
            ],
          },
        });
        const t = await prisma.$transaction([updatedWorkflow, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'confirmReceiptByCorporation',
            session: _context.session,
            response: t,
          },
          'confirmReceiptByCorporation graphql response'
        );
        return t[0];
      }
    },
    async updateAssetsStates(_, { ids, status }, _context): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canEditAssets(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      if (ids) {
        const result = await prisma.asset.updateMany({
          where: { id: { in: ids as string[] } },
          data: {
            status,
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'updateAssetsStates',
            session: _context.session,
            response: result,
          },
          'updateAssetsStates graphql response'
        );
        return result.count;
      }
    },
    async createTags(_, { tags }, _context): Promise<number> {
      // check authentication and permission

      if (
        !_context?.session ||
        !(await canCreateAsset(_context?.session)) ||
        !(await canCreateTags(_context?.session))
      ) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      let operations: any = [];
      tags.forEach(async (tag) => {
        if (tag?.newAsset) {
          let w = prisma.tag.create({
            data: {
              id: tag?.tagId,
              asset: {
                create: {
                  equipment: {
                    connect: { terminologyCode: tag?.newAsset?.equipmentId },
                  },
                  place: { connect: { id: tag?.newAsset?.placeId } },
                },
              },
            },
          });
          operations.push(w);
        } else if (tag?.assetId) {
          let w = prisma.tag.create({
            data: {
              id: tag?.tagId,
              asset: {
                connect: { id: tag?.assetId },
              },
            },
          });
          operations.push(w);
        }
      });
      const result = await prisma.$transaction(operations);
      logger.info(
        {
          type: 'response',
          operation: 'createTags',
          session: _context.session,
          response: result,
        },
        'createTags graphql response'
      );
      return 2;
    },
    async rfidCheckWorkflows(
      _,
      { workflowNumber, processId, assets, checkedAssetsIds },
      _context
    ): Promise<any> {
      // check authentication and permission

      if (!_context?.session || !(await canCreateLicense(_context?.session))) {
        throw new GraphQLError('Not authenticated or authorized');
      }

      const o: any = [];
      // Enter Hospital Workflow
      if (processId === 1) {
        const updatedStates = prisma.asset.updateMany({
          where: { id: { in: checkedAssetsIds as string[] } },
          data: {
            status: 'موجود در بیمارستان',
          },
        });
        Object.entries(assets).forEach(([k, v]) => {
          o.push(
            prisma.equipment.update({
              where: { terminologyCode: k },
              data: { available: { increment: v as number } },
            })
          );
        });
        const updatedWorkflow = prisma.workflow.update({
          where: { workflowNumber },
          data: {
            nextStageName: '',
            passedStages: {
              push: {
                stageID: 3,
                stageName: 'RFID ثبت ورود کپسول به انبار توسط',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  assets,
                },
              },
            },
          },
        });
        const t = await prisma.$transaction([
          updatedStates,
          updatedWorkflow,
          ...o,
        ]);
        logger.info(
          {
            type: 'response',
            operation: 'rfidCheckWorkflows',
            session: _context.session,
            response: t,
          },
          'rfidCheckWorkflows graphql response'
        );
        return t[1];
      }
      // Exit Hospital Workflow
      else if (processId === 2) {
        const updatedStates = prisma.asset.updateMany({
          where: { id: { in: checkedAssetsIds as string[] } },
          data: {
            status: 'در حال ارسال',
          },
        });
        Object.entries(assets).forEach(([k, v]) => {
          o.push(
            prisma.equipment.update({
              where: { terminologyCode: k },
              data: {
                sending: { increment: v as number },
                available: { decrement: v as number },
              },
            })
          );
        });
        const updatedWorkflow = prisma.workflow.update({
          where: { workflowNumber },
          data: {
            nextStageName: 'تایید تحویل به شرکت',
            passedStages: {
              push: {
                stageID: 3,
                stageName: 'RFID ثبت خروج کپسول از انبار توسط',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  assets,
                },
              },
            },
          },
        });
        const t = await prisma.$transaction([
          updatedStates,
          updatedWorkflow,
          ...o,
        ]);
        logger.info(
          {
            type: 'response',
            operation: 'rfidCheckWorkflows',
            session: _context.session,
            response: t,
          },
          'rfidCheckWorkflows graphql response'
        );
        return t[1];
      }
    },
    async updateCurrentConfig(
      _,
      { id, ignoreManagerApproval, ignoreRFID },
      _context
    ) {
      // check authentication and permission

      // manager recognition
      if (!_context?.session || !isManager(_context?.session)) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const result = await prisma.config.update({
        where: { id },
        data: { ignoreManagerApproval, ignoreRFID },
      });
      logger.info(
        {
          type: 'response',
          operation: 'updateCurrentConfig',
          session: _context.session,
          response: result,
        },
        'updateCurrentConfig graphql response'
      );
      return result;
    },
    async approveExitWorkflow(_, { workflowNumber }, _context): Promise<any> {
      // check authentication and permission

      // manager recognition
      if (
        !_context?.session ||
        _context?.session?.user?.role?.name !== 'مدیریت'
      ) {
        throw new GraphQLError('Not authenticated or authorized');
      }
      const currentConfig = await prisma.config.findFirst({
        where: { current: true },
      });
      const o: any = [];
      // RFID is shut down
      if (currentConfig?.ignoreRFID) {
        const stage1 = await prisma.workflow.findFirst({
          where: { workflowNumber },
        });
        const stage2 = prisma.workflow.update({
          where: { workflowNumber },
          data: {
            nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
            passedStages: {
              push: {
                stageID: 2,
                stageName: 'قبول درخواست توسط مدیریت',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
              },
            },
          },
        });

        const stage3 = prisma.workflow.update({
          where: { workflowNumber },
          data: {
            nextStageName: 'تایید تحویل به شرکت',
            passedStages: {
              push: {
                stageID: 3,
                stageName: 'RFID ثبت خروج کپسول از انبار توسط',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
                havaleh: {
                  assets: { ...stage1?.passedStages?.[0]?.havaleh?.assets },
                },
              },
            },
          },
        });

        Object.entries(
          giveMeJustAggCounts(
            stage1?.passedStages?.[0]?.havaleh
              ?.assets as AggregatedTransferedAssets
          )
        ).forEach(([k, v]) => {
          o.push(
            prisma.equipment.update({
              where: { terminologyCode: k },
              data: { sending: { increment: v as number } },
            })
          );
        });
        const transaction = await prisma.$transaction([stage2, stage3, ...o]);
        logger.info(
          {
            type: 'response',
            operation: 'approveExitWorkflow',
            session: _context.session,
            response: transaction,
          },
          'approveExitWorkflow graphql response'
        );
        return transaction?.[0]?.workflowNumber;
      } else {
        const result = await prisma.workflow.update({
          where: { workflowNumber },
          data: {
            nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
            passedStages: {
              push: {
                stageID: 2,
                stageName: 'قبول درخواست توسط مدیریت',
                submittedByUser: {
                  id: _context?.session?.user?.id,
                  firstNameAndLastName:
                    _context?.session?.user?.firstNameAndLastName,
                  role: _context?.session?.user?.role?.name,
                },
              },
            },
          },
        });
        logger.info(
          {
            type: 'response',
            operation: 'approveExitWorkflow',
            session: _context.session,
            response: result,
          },
          'approveExitWorkflow graphql response'
        );
        return result?.workflowNumber;
      }
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
async function repetitiveHavalehId(havalehId: string): Promise<boolean> {
  const repetativeHavaleh = await prisma.workflow.findFirst({
    where: { passedStages: { some: { havaleh: { is: { id: havalehId } } } } },
  });
  if (repetativeHavaleh) {
    return true;
  }
  return false;
}
