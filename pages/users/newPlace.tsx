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
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      {/* <NewPlace
        sending={false}
        createNewPlaceHandler={async (
          name: string,
          superPlaceId: string,
          typeOfWork: string,
          state: string,
          city: string,
          postalCode: string,
          address: string,
          telephone: string,
          mobileNumber: string,
          website: string,
          nationalId: string,
          economicalCode: string,
          registeredNumber: string,
          description: string,
          edit: string
        ) => {
          return false;
        }}
      /> */}
      <Snackbar />
    </Layout>
  );
}
