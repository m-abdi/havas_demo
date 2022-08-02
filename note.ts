import prisma from './prisma/client';

(async () => {
  await prisma.config.create({
    data: {
      ignoreManagerApproval: true,
      current: true,
    },
  })
})();
