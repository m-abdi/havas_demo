import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;
const prisma =
  global.prisma || (typeof window === 'undefined' && new PrismaClient());

if (process.env.NODE_ENV === 'development') global.prisma = prisma;
(async () => {
await prisma.equipment.updateMany({ where: {name: {contains: "۴۰"}}, data: {name:"kl"}});
})();
