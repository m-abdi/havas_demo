import Layout from 'src/Components/Layout';
import NewPlace from 'src/Screens/NewPlace';
import React from 'react';
import { Snackbar } from '@mui/material';

export default function newPlace() {
  return (
    <>
      <Layout>
        <NewPlace />
      </Layout>
      <Snackbar />
    </>
  );
}
