import prisma from './prisma/client';

(async () => {
  console.log(
    await prisma.workflow.findMany({
      where: {
        passedStages: {
          havaleh: {
            description: undefined,
            id: '',
            transportationName: '',
            transportationTelephone: '',
            date: null,
            assets: '',
          },
        },
      },
    })
  );
})();
