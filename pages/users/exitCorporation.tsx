import {
  AllPersonsOptionsDocument,
  GetWorkflowNumberDocument,
} from 'lib/graphql-operations';
import React, { useMemo } from 'react';

import ExitCorporation from 'src/Screens/ExitCorporation';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewEquipment from 'src/Screens/NewEquipment/NewEquipment';
import NewPerson from 'src/Screens/NewPerson';
import NewPlace from 'src/Screens/NewPlace';
import Snackbar from 'src/Components/Snackbar';
import usePlaces from 'src/Logic/usePlaces';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'ثبت خروج از شرکت';

export default function exitCorporation() {
  // access to browser url input
  const router = useRouter();
  // use user session context
  const { data: session, status } = useSession();
  //
  // get workflow number from server
  const { data, loading } = useQuery(GetWorkflowNumberDocument);
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <ExitCorporation
        loading={loading || status === 'loading'}
        sending={false}
        createNewHandler={() => {}}
        workflowNumber={data?.getWorkflowNumber as string}
        corporationRepresentative={{
          id: session?.user?.id as string,
          label: session?.user?.firstNameAndLastName as string,
        }}
      />
    </Layout>
  );
}
