import React, { useCallback, useState } from 'react';

import { CreateRoleDocument } from '../../lib/graphql-operations';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import { NewRole } from 'src/Components/NewRole';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';
import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function newRole() {
  // states
  const [loading, setLoading] = useState(false)
  // other hooks
  const router = useRouter()
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
  const onSubmit = useCallback(async (name: string, permissions: any) => {
    // provide a response for user interaction(sending...)
    setLoading(true)
    setSnackbarColor('info');
    setSnackbarMessage('در حال ارسال');
    setSnackbarOpen(true);
    try {
      const resp = await createRoleMutation({
        variables: { name, permissions },
      });
      if (resp.data) {
        setSnackbarColor('success');
        setSnackbarMessage('انجام شد');
        setSnackbarOpen(true);
        router.push("/users/roles")
        return true;
      } else if (resp.errors) {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
        console.log(resp.errors);
      }
    } catch (e:any) {
      console.log(e.message);
    }
    return false;
  }, [router]);

  

  
  return (
    <Layout>
      {loading? <Loader center={false}/>:<NewRole onSubmit={onSubmit} />}
      <Snackbar />
    </Layout>
  );
}
