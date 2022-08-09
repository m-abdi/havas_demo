import React, { useContext, useEffect } from 'react';

import AuthenticationRequired from 'src/AuthenticationRequired';
import EquipmentsOverviewCarousel from '@/src/Composites/EquipmentsOverviewCarousel/EquipmentsOverviewCarousel';
import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from '../../src/Components/Layout/Layout';
import Loader from 'src/Components/Loader';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'داشبورد';
export default function dashboard() {
  return (
    <AuthenticationRequired>
      <Layout pageName={pageName}>
        <Head>
          <title>{`${pageName}`} | حواس</title>
        </Head>
        <EquipmentsOverviewCarousel
          equipments={[
            {
              name: 'اکسیژن ۵۰ لیتری',
              outsourced: 4,
              sending: 0,
              receiving: 2152,
              available: 3,
            },
            {
              name: 'اکسیژن ۴۰ لیتری',
              outsourced: 4,
              sending: 0,
              receiving: 2152,
              available: 3,
            },
          ]}
        />
      </Layout>
    </AuthenticationRequired>
  );
}
