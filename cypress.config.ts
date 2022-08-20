import { AnyCnameRecord } from 'dns';
import { Workflow } from 'lib/resolvers-types';
import { defineConfig } from 'cypress';
import prisma from './prisma/client';
import sendToMQTTBroker from './src/mqttClientNodeJs';

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
        deleteAsset: (tag: string) => {
          const equipment = prisma.tag
            .delete({
              where: { id: tag },
            })
            .then((p) => p)
            .catch((e) => null);
          return null;
        },
        deleteWorkflow: (workflowNumber: string) => {
          prisma.workflow
            .deleteMany({
              where: { workflowNumber },
            })
            .then((p) => {
              console.log(p);
              return p;
            })
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
        checkAsset: (info: any) => {
          return prisma.asset
            .findFirst({
              where: {
                tag: { id: info?.tag },
                equipment: { terminologyCode: info?.equipment },
                place: { name: info?.place },
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
        changeConfig: (ignoreManagerApproval: boolean) => {
          return prisma.config
            .updateMany({
              data: {
                ignoreManagerApproval,
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
        checkWorkflow: (data: any) => {
          return prisma.workflow
            .findFirst({
              where: data?.nextStageName
                ? {
                    nextStageName: data?.nextStageName,
                    instanceOfProcessId: data?.instanceOfProcessId,
                    passedStages: {
                      some: {
                        submittedByUser: {
                          is: { firstNameAndLastName: data?.deliverer },
                        },
                        havaleh: {
                          is: {
                            id: data?.havalehId,
                            description: data?.description,
                            transportationName: data?.transportationName,
                            transportationTelephone:
                              data?.transportationTelephone,
                            transportationTelephone2:
                              data?.transportationTelephone2,
                            corporation: { is: { name: data?.corporation } },
                            assets: { is: { ...data?.assets } },
                          },
                        },
                      },
                    },
                  }
                : {
                    instanceOfProcessId: data?.instanceOfProcessId,
                    passedStages: {
                      some: {
                        submittedByUser: {
                          is: { firstNameAndLastName: data?.deliverer },
                        },
                        havaleh: {
                          is: {
                            id: data?.havalehId,
                            description: data?.description,
                            transportationName: data?.transportationName,
                            transportationTelephone:
                              data?.transportationTelephone,
                            transportationTelephone2:
                              data?.transportationTelephone2,
                            corporation: { is: { name: data?.corporation } },
                            assets: { is: { ...data?.assets } },
                          },
                        },
                      },
                    },
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
        sendToMQTTBroker: (message: string) => {
          sendToMQTTBroker(message);
          return null;
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
