import 'dotenv/config';

/* eslint-disable no-undef */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default NextAuth({
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      try {
        const userData = await prisma.person.findFirst({
          where: {
            id: session.user.id,
          },
        });
        session.user = { ...session.user, ...userData, password: undefined };
        return session;
      } catch (e) {
        console.log(e.message);
        return session;
      } finally {
        await prisma.$disconnect();
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        try {
          const potentialUser = await prisma.person.findFirst({
            where: { id: credentials.id, password: credentials.password },
          });
          if (potentialUser) {
            return potentialUser;
          }
          return null;
        } catch (e) {
          console.log(e.message);
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
});
