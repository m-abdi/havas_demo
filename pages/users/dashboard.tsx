import Layout from '../../src/AppBar';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
export default function dashboard() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/users/login');
    },
  });
  return <Layout>داشبورد</Layout>;
}
