import { defineConfig } from 'cypress';
import prisma from './prisma/client';
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deletePerson: (id: string) => {
          return prisma.person
            .delete({ where: { id } })
            .then((u) => null)
            .catch((e) => null);
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
