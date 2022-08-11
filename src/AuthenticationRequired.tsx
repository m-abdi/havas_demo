import React, { useContext, useEffect } from 'react';

import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from './Components/Atomic/Layout';
import Loader from './Components/Atomic/Loader';
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
