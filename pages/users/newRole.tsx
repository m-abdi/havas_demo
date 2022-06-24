import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { AllRolesDocument } from 'lib/graphql-operations';
import AuthenticationRequired from 'src/AuthenticationRequired';
import { CreateRoleDocument } from '../../lib/graphql-operations';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import { NewRole } from 'src/Screens/NewRole';
import Snackbar from 'src/Components/Snackbar';
import { useContext } from 'react';
import { useRouter } from 'next/router';

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

  // other hooks
  const [createRoleMutation] = useMutation(CreateRoleDocument);
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    snackbarColor,
    setSnackbarColor,
  } = useContext(SnackbarContext);
  //   handlers

  const onSubmit = useCallback(
    async (name: string, permissions: any, edit: string) => {
      // provide a response for user interaction(sending...)
      setLoading(true);
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      try {
        const resp = await createRoleMutation({
          variables: { name, permissions, edit },
        });
        if (resp.data) {
          setSnackbarColor('success');
          setSnackbarMessage('انجام شد');
          setSnackbarOpen(true);
          router.push('/users/roles');
          return true;
        } else if (resp.errors) {
          setSnackbarColor('error');
          setSnackbarMessage('خطا');
          setSnackbarOpen(true);
          console.log(resp.errors);
        }
      } catch (e: any) {
        console.log(e.message);
      }
      return false;
    },
    [router]
  );

  return (
    <AuthenticationRequired pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      {loading ? (
        <Loader center={false} />
      ) : (
        <NewRole existingRoleData={existingRoleData} onSubmit={onSubmit} />
      )}
      <Snackbar />
    </AuthenticationRequired>
  );
}
