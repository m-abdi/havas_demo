import { PrismaClient } from '@prisma/client';
const prisma = global.prisma ||
    (typeof window === 'undefined' &&
        new PrismaClient());
if (process.env.NODE_ENV === 'development')
    global.prisma = prisma;
export default prisma;
