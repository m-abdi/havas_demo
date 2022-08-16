import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { AllRolesDocument } from 'lib/graphql-operations';
import AuthenticationRequired from 'src/AuthenticationRequired';
import { CreateRoleDocument } from '../../lib/graphql-operations';
import Head from 'next/head';
import Layout from '@/src/Components/Atomic/Layout';
import Loader from '@/src/Components/Atomic/Loader';
import { NewRole } from '@/src/Components/Pages/NewRole';
import Snackbar from '@/src/Components/Atomic/Snackbar';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import useRoles from '@/src/Logic/useRoles';

const pageName = 'نقش جدید';
export default function newRole() {
  const router = useRouter();

  // states
  const [loading, setLoading] = useState(false);
  const [existingRoleData, setExistingRoleData] = useState(
    router.query.role ? JSON?.parse(router?.query?.role as string) : null
  );
  // effects
  useEffect(() => {
    if ('role' in router.query) {
      setExistingRoleData(JSON.parse(router?.query?.role as string));
    }
  }, [router.query]);
  const { createNew } = useRoles();

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      {loading ? (
        <Loader center={false} />
      ) : (
        <NewRole
          existingRoleData={existingRoleData}
          onSubmit={async (name: string, permissions: any, edit: string) => {
            const resp = await createNew(name, permissions, edit);
            if (resp) {
              router.push('/users/roles');
            }
          }}
        />
      )}
    </Layout>
  );
}
