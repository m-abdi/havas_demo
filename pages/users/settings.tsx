import {
  GetCurrentConfigDocument,
  UpdateCurrentConfigDocument,
} from 'lib/graphql-operations';
import React, { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Layout from '@/src/Components/Atomic/Layout';
import { Session } from 'next-auth';
import Settings from '@/src/Components/Pages/Settings';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'تنظیمات';
export default function settings() {
  const { data: session } = useSession();
  const { data, loading } = useQuery(GetCurrentConfigDocument, {fetchPolicy: "cache-and-network"});
  //
  const router = useRouter();
  const [updateCurrentConfigMutation] = useMutation(
    UpdateCurrentConfigDocument
  );
  const submitHandler = useCallback(
    async (id: string, ignoreManagerApproval: boolean) => {
      const r = await updateCurrentConfigMutation({
        variables: { id, ignoreManagerApproval },
        refetchQueries: [
          { query: GetCurrentConfigDocument },
          'getCurrentConfigDocument',
        ],
      });
      if (r?.data) {
        router.push('/users/dashboard');
      } else {
        alert('خطا');
      }
    },
    []
  );

  return (
    <Layout pageName={pageName}>
      <Settings
        session={session as Session}
        loading={loading}
        data={data?.getCurrentConfig as any}
        submitHandler={submitHandler}
      />
    </Layout>
  );
}
