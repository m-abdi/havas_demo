import { useEffect, useState } from 'react';

import Appbar from "../../src/AppBar"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Head from 'next/head';
import { Client as MqttClient } from '../../src/paho-mqtt';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function PahoClient(setMessage: any, setConnectionStatus: any) {
  // Create a client instance
  const client = new MqttClient(
    process.env.NEXT_PUBLIC_MQTT_BROKER_URL as string,
    Number(process.env.NEXT_PUBLIC_MQTT_BROKER_PORT),
    '/mqtt',
    ''
  );

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({
    onSuccess: onConnect,
    useSSL: true,
    userName: process.env.NEXT_PUBLIC_MQTT_BROKER_USERNAME as string,
    password: process.env.NEXT_PUBLIC_MQTT_BROKER_PASSWORD as string,
  } as any);

  // called when the client connects
  function onConnect() {
    setConnectionStatus('Connected');
    client.subscribe('rfid');
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message: any) {
    setMessage(message.payloadString);
  }
}
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
      <title>
        تگ جدید | حواس
      </title>
    </Head>
    <Appbar>
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
    </Appbar>
    </>
  );
};

export default NewTag;
