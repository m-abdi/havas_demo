import { useContext, useEffect, useState } from 'react';

import { GiveMeRfidCredentialsDocument } from 'lib/graphql-operations';
import { Client as MqttClient } from '../paho-mqtt';
import { SnackbarContext } from '../../pages/_app';
import useNotification from './useNotification';
import { useQuery } from '@apollo/client';

export default function useMQTT(channel = 'rfid') {
  // states
  const [mqttMessage, setMqttMessage] = useState();
  const [mqttStatus, setMqttStatus] = useState('DISCONNECTED');
  //
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // ask for mqtt connection credentials from server
  const { data, loading, error } = useQuery(GiveMeRfidCredentialsDocument, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    // start mqtt websocket connection in browser
    if (data) {
      const credentials = data?.giveMeRFIDCredentials;
      startConnection(
        credentials?.host,
        credentials?.port,
        credentials?.username,
        credentials?.password,
        credentials?.useSSL
      );
    } else if (error) {
      useNotification(
        'error',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen,
        'دسترسی غیر مجاز'
      );
    }
  }, [data, error]);
  // show notification every time a new mqtt message is received
  useEffect(() => {
    useNotification(
      'newTag',
      setSnackbarColor,
      setSnackbarMessage,
      setSnackbarOpen
    );
  }, [mqttMessage]);

  // show notification every time a new mqtt message is received
  useEffect(() => {
    if (mqttStatus === 'CONNECTED') {
      useNotification(
        'success',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen,
        '',
        'اتصال با RFID برقرار شد'
      );
    } else if (mqttStatus === 'DISCONNECTED') {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen,
        'در حال برقراری اتصال با RFID'
      );
    }
  }, [mqttStatus]);

  // connection manager
  function startConnection(host, port, username, password, useSSL) {
    const client = new MqttClient(host, Number(port), '/mqtt', '');
    // called when the client connects
    function onConnect() {
      setMqttStatus('CONNECTED');
      client.subscribe(channel);
    }
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log(`onConnectionLost:${responseObject.errorMessage}`);
      }
      client.connect({
        onSuccess: onConnect,
        useSSL: useSSL,
        userName: username,
        password: password,
      });
    }

    // called when a message arrives
    function onMessageArrived(message) {
      setMqttMessage(message.payloadString);
    }
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
      onSuccess: onConnect,
      useSSL: useSSL,
      userName: username,
      password: password,
    });
  }

  return { mqttMessage, mqttStatus };
}
