import { AllPersonsDocument } from 'lib/graphql-operations';
import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import React from 'react';
import { useQuery } from '@apollo/client';

const pageName = 'اشخاص';
export default function persons() {
  // get all persons from graph
  const { data, loading, error } = useQuery(AllPersonsDocument);
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <Persons loading={loading}  data={data?.persons as any} />
    </Layout>
  );
}
