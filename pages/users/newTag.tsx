/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Head from "next/head";
import Layout from '../../src/Layout';
import type { NextPage } from 'next';
import { PahoClient } from 'src/PahoClient';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const NewTag: NextPage = () => {
  const router = useRouter();
  // check for expired sessions or not loged-in users ---> redirect to login page
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/users/login');
    },
  });
  // states
  const [message, setMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  
  useEffect(() => {
    if (connectionStatus === 'Disconnected') {
      PahoClient(setMessage, setConnectionStatus);
    }
  }, [connectionStatus]);

  return (
    <>
      <Head>
        <title>تگ جدید | حواس</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              sx={{ color: connectionStatus === 'Connected' ? 'green' : 'red' }}
            >
              Status : {connectionStatus}
            </Typography>
            <Typography variant='h2' component='h4' dir='ltr' gutterBottom>
              {message}
            </Typography>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default NewTag;
