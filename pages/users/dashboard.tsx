import React, { useContext, useEffect } from 'react';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from '../../src/Components/Layout/Layout';
import Loader from 'src/Components/Loader';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'داشبورد';
export default function dashboard() {
  return (
    <AuthenticationRequired pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      داشبورد
    </AuthenticationRequired>
  );
}
