import { useContext, useEffect, useState } from 'react';

import { Client as MqttClient } from '../paho-mqtt';
import { SnackbarContext } from '../../pages/_app';
import useNotification from './useNotification';

export default function useMQTT(channel = 'rfid') {
  // states
  const [mqttMessage, setMqttMessage] = useState();
  const [mqttStatus, setMqttStatus] = useState('DISCONNECTED');
  //
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);

  // start mqtt websocket connection in browser
  useEffect(() => {
    startConnection();
  }, []);
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
  function startConnection() {
    const client = new MqttClient(
      process.env.NEXT_PUBLIC_MQTT_BROKER_URL,
      Number(process.env.NEXT_PUBLIC_MQTT_BROKER_PORT),
      '/mqtt',
      ''
    );
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
        useSSL:
          process.env.NEXT_PUBLIC_MQTT_BROKER_URL === 'localhost'
            ? false
            : true,
        userName: process.env.NEXT_PUBLIC_MQTT_BROKER_USERNAME,
        password: process.env.NEXT_PUBLIC_MQTT_BROKER_PASSWORD,
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
      useSSL: true,
      userName: process.env.NEXT_PUBLIC_MQTT_BROKER_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_BROKER_PASSWORD,
    });
  }

  return { mqttMessage, mqttStatus };
}
