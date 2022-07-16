import { useEffect, useState } from 'react';

import { Client as MqttClient } from '../paho-mqtt';

export default function useMQTT(channel = 'rfid') {
  // states
  const [mqttMessage, setMqttMessage] = useState();
  const [mqttStatus, setMqttStatus] = useState('DISCONNECTED');
  // start mqtt websocket connection in browser
  useEffect(() => {
    startConnection();
  }, []);
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
