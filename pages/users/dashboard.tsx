import  Head  from 'next/head';
import Layout from '../../src/Components/Layout/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
export default function dashboard() {
  const router = useRouter();
  // check for expired sessions or not loged-in users ---> redirect to login page
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/users/login');
    },
  });
  return (
    <>
    <Head>
      <title>
        داشبورد | حواس
      </title>
    </Head>
      <Layout>داشبورد</Layout>
    </>
  );
}
