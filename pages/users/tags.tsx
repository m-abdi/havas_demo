import Head from 'next/head';
import Layout from 'src/Components/Layout'
import React from 'react'
const pageName = "تگ ها"
export default function tags() {
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
    </Layout>
  );
}
