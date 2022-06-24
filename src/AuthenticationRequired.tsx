import React, { useContext, useEffect } from 'react';

import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from './Components/Layout';
import Loader from './Components/Loader';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function AuthenticationRequired({
  children,
  pageName
}: {
  children: any;
  pageName: string;
}) {
  const router = useRouter();
  // check for expired sessions or not loged-in users ---> redirect to login page
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/users/login');
    },
  });
  // update page name for appbar2
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  return session ? (
    <Layout>{children}</Layout>
  ) : (
    <>
      <Head>
        <title>در حال ورود |‌ حواس</title>
      </Head>
      <Loader withText={true} center />;
    </>
  );
}
