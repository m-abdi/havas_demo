import React, { useContext, useEffect } from 'react';

import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from 'src/Components/Layout';
import NewPlace from 'src/Screens/NewPlace';
import { Snackbar } from '@mui/material';

const pageName = 'مکان جدید';

export default function newPlace() {
  // page info context

  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  //
  return (
    <>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <Layout>
        <NewPlace />
      </Layout>
      <Snackbar />
    </>
  );
}
