import { defineConfig } from 'cypress';
import prisma from './prisma/client';
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deletePersonAndPlace: ({ personId, placeName }) => {
          const person = prisma.person
            .delete({
              where: { id: personId },
            })
            .then((p) => p)
            .catch((e) => null);
          const place = prisma.place
            .delete({
              where: { name: placeName },
            })
            .then((p) => p)
            .catch((e) => null);
          return null;
        },
        deleteEquipment: (terminologyCode: string) => {
          const equipment = prisma.equipment
            .delete({
              where: { terminologyCode },
            })
            .then((p) => p)
            .catch((e) => null);
          return null;
        },
        createPlace: (name: string) => {
          prisma.place
            .upsert({
              where: { name },
              update: {},
              create: { name },
            })
            .then((p) => p)
            .catch((e) => null);
          return null;
        },
        getAllEquipments: () => {
          prisma.equipment
            .findMany()
            .then((p) => p)
            .catch((e) => null);
          return null;
        },
        checkPerson: (info: any) => {
          return prisma.person
            .findFirst({
              where: {
                id: info.id,
                firstNameAndLastName: info.firstNameAndLastName,
                place: { name: info.placeName },
                role: { name: info.roleName },
                state: info.state,
                city: info.city,
                postalCode: info.postalCode,
                address: info.address,
                telephone: info.telephone,
                mobileNumber: info.mobileNumber,
                website: info.website,
              },
            })
            .then((r) => {
              if (r) {
                return r;
              } else {
                return undefined;
              }
            });
        },
        checkEquipment: (info: any) => {
          return prisma.equipment
            .findFirst({
              where: {
                name: info?.name,
                terminologyCode: info?.terminologyCode,
                model: info?.model,
                factory: info?.factory,
                serialNumber: info?.serialNumber,
                productionYear: info?.productionYear,
                installationYear: info?.installationYear,
                hasInstructions: info?.hasInstructions,
                supportCompany: { name: info?.supportCompany },
                supportTelephone1: info?.supportTelephone1,
                supportTelephone2: info?.supportTelephone2,
              },
            })
            .then((r) => {
              if (r) {
                return r;
              } else {
                return undefined;
              }
            });
        },
      });
    },
    baseUrl: 'http://localhost:3000',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
