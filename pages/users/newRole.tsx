import React, { useCallback } from 'react';

import Layout from 'src/Components/Layout';
import { NewRole } from 'src/Components/NewRole';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';
import { useContext } from 'react';

export default function newRole() {
  // other hooks
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
  (name: string, permissions: any) => {
    // provide a response for user interaction(sending...)
    setSnackbarColor('info')
    setSnackbarMessage("در حال ارسال")
    setSnackbarOpen(true)
    return true
  },
  [],
)

  return (
    <Layout>
      <NewRole onSubmit={onSubmit} />
      <Snackbar/>
    </Layout>
  );
}
