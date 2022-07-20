import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;
const prisma =
  global.prisma ||
  (typeof window === 'undefined' &&
    new PrismaClient({
      datasources: {
        db: {
          url:
            process?.env?.DATABASE_URL ||
            'mongodb+srv://mehdi:JGcfN2Il0YeY0WwI@cluster0.j57ml.mongodb.net/havas?retryWrites=true&w=majority',
        },
      },
    }));

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
