import { Grid, Select } from '@mui/material';
import React, { useEffect } from 'react';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import { InfoContext } from 'pages/_app';
import Layout from '../../src/Components/Atomic/Layout';
import { useContext } from 'react';

const pageName = 'درخواست مجوز جدید';
export default function newLicense() {
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <Grid
        container
        direction={'row'}
        spacing={4}
        alignItems='center'
        sx={{ inlineSize: '100%' }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Select native fullWidth label='انباردار'>
            <option>mehdi abdi</option>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select native fullWidth label='تحویل گیرنده'>
            <option>مهدی عبدی</option>
          </Select>
        </Grid>
      </Grid>
    </Layout>
  );
}
