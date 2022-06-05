import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
/* eslint-disable no-undef */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';

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
            email: session.user.email,
          },
        });
        session.user = {...session.user, ...userData, password: undefined};
        return session;
      } catch (e) {
        console.log(e.message);
        return session;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const potentialUser = await prisma.person.findFirst({
          where: { email: credentials.email, password: credentials.password },
        });
        if (potentialUser) {
          return potentialUser;
        }
        return null;
      },
    }),
  ],
});
