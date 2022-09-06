import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || (typeof window === 'undefined' && new PrismaClient());
if (process.env.NODE_ENV === 'development')
    global.prisma = prisma;
(async () => {
    await prisma.equipment.updateMany({ data: { available: 0, outsourced: 0, sending: 0, receiving: 0 } });
})();
