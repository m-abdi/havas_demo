import 'dotenv/config';

/* eslint-disable no-undef */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import prisma from '../../../prisma/client';

export default NextAuth({
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      try {
        const userData = await prisma.person.findFirst({
          where: {
            id: session.user.email,
          },
          include: {
            role: true,
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
            where: { id: credentials.email, password: credentials.password },
          });
          if (potentialUser) {
            await prisma.$disconnect();
            console.log(potentialUser);
            return { name: potentialUser.firstNameAndLastName, email: potentialUser.id }
          }
          await prisma.$disconnect();
          return null;
        } catch (e) {
          console.log(e.message);
        }
        await prisma.$disconnect();
      },
    }),
  ],
});
