import prisma from './prisma/client';

(async () => {
  await prisma.equipment.createMany({
    data: [
      {
        name: 'اکسیژن ۵۰ لیتری',
        terminologyCode: 'oxygen_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'اکسیژن ۴۰ لیتری',
        terminologyCode: 'oxygen_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
    ],
  });
})();
