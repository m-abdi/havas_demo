import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { AllRolesDocument } from 'lib/graphql-operations';
import { CreateRoleDocument } from '../../lib/graphql-operations';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import { NewRole } from 'src/Components/NewRole';
import Snackbar from 'src/Components/Snackbar';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const pageName = 'نقش جدید';
export default function newRole() {
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  const router = useRouter();

  // states
  const [loading, setLoading] = useState(false);
  const [existingRoleData, setExistingRoleData] = useState();
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
          window.location.href = '/users/roles'
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
    <Layout>
      {loading ? (
        <Loader center={false} />
      ) : (
        <NewRole existingRoleData={existingRoleData} onSubmit={onSubmit} />
      )}
      <Snackbar />
    </Layout>
  );
}
