import Head from 'next/head';
import Loader from './Components/Loader';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function AuthenticationRequired({
  children,
}: {
  children: any;
}) {
  const router = useRouter();
  // check for expired sessions or not loged-in users ---> redirect to login page
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/users/login');
    },
  });
  return session ? (
    children
  ) : (
    <>
    <Head>
        <title>در حال ورود |‌ حواس</title>
    </Head>
      <Loader withText={true} center />;
    </>
  );
}
