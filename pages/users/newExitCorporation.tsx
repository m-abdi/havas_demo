import {
  AllPersonsOptionsDocument,
  CreateEnterWorkflowDocument,
  GetWorkflowNumberDocument,
} from 'lib/graphql-operations';
import React, { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import ExitCorporation from 'src/Screens/NewExitCorporation';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useWorkflows from 'src/Logic/useWorkflows';

const pageName = 'ثبت خروج از شرکت';

export default function newExitCorporation() {
  // access to browser url input
  const router = useRouter();
  // use user session context
  const { data: session, status } = useSession();
  //
  // get workflow number from server
  const { data, loading } = useQuery(GetWorkflowNumberDocument, {fetchPolicy: "cache-and-network"});
  const { sending, createNewEnter } = useWorkflows();
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <ExitCorporation
        editable={true}
        loading={loading || status === 'loading'}
        sending={sending}
        createNewHandler={createNewEnter}
        workflowNumber={data?.getWorkflowNumber as string}
        corporationRepresentative={{
          id: session?.user?.id as string,
          label: session?.user?.firstNameAndLastName as string,
        }}
      />
    </Layout>
  );
}
