import React, { useContext, useEffect } from 'react';

import AuthenticationRequired from 'src/AuthenticationRequired';
import EquipmentsOverviewCarousel from '../../src/Components/Composite/EquipmentsOverviewCarousel/EquipmentsOverviewCarousel';
import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from '../../src/Components/Atomic/Layout';
import Loader from '../../src/Components/Atomic/Loader';
import isManager from 'src/isManager';
import useEquipments from '../../src/Logic/useEquipments';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'داشبورد';
export default function dashboard() {
  const { equipmentsStatus, equipmentsStatusLoading } = useEquipments(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    false,
    true
  );
  const { data: session } = useSession();

  return (
    <AuthenticationRequired>
      <Layout pageName={pageName}>
        <Head>
          <title>{`${pageName}`} | حواس</title>
        </Head>
        {session && isManager(session) && (
          <EquipmentsOverviewCarousel
            equipments={equipmentsStatus as any}
            loading={equipmentsStatusLoading}
          />
        )}
      </Layout>
    </AuthenticationRequired>
  );
}
