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
          return null
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
