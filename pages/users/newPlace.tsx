import React, { useContext, useEffect } from 'react';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from 'src/Components/Layout';
import NewPlace from 'src/Screens/NewPlace';
import { Snackbar } from '@mui/material';

const pageName = 'مکان جدید';

export default function newPlace() {
  //
  return (
    <AuthenticationRequired pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewPlace
        sending={false}
        submitHandler={async () => {
          return;
        }}
      />
      <Snackbar />
    </AuthenticationRequired>
  );
}
