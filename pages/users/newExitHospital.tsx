import {
  AllPersonsOptionsDocument,
  CreateEnterWorkflowDocument,
  GetWorkflowNumberDocument,
} from '../../lib/graphql-operations';
import React, { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Layout from '../../src/Components/Atomic/Layout';
import NewExitHospital from '../../src/Components/Pages/NewExitHospital';
import usePlaces from '../../src/Logic/usePlaces';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'درخواست خروج از بیمارستان';

export default function newExitCorporation() {
  // use user session context
  const { data: session, status } = useSession();
  //
  // get workflow number from server
  const { data, loading } = useQuery(GetWorkflowNumberDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const { sending, createNewExit } = useWorkflows();
  const { placesList, placesListLoading } =  usePlaces(undefined, undefined, undefined, undefined, undefined, undefined, false, true)
  return (
    <Layout pageName={pageName}>
      <NewExitHospital
        editable={true}
        loading={loading || status === 'loading'}
        sending={sending}
        corporations={placesList as any}
        corporationsLoading={placesListLoading}
        createNewHandler={createNewExit}
        workflowNumber={data?.getWorkflowNumber as string}
        warehouseKeeper={{
          id: session?.user?.id as string,
          label: session?.user?.firstNameAndLastName as string,
        }}
      />
    </Layout>
  );
}
