import { useContext, useEffect, useState } from 'react';

import { Client as MqttClient } from '../paho-mqtt';

var mqttTimer;
export default function useMQTT(channel = 'rfid') {
  // states
  const [mqttClient, setMQTTClient] = useState(null);
  const [mqttMessage, setMqttMessage] = useState();
  const [mqttStatus, setMqttStatus] = useState('DISCONNECTED');
  //

  useEffect(() => {
    // start mqtt websocket connection in browser
    if (data) {
      startConnection(
        'host',
        'port',
        'username',
        'password',
        false //useSSL
      );
    } else if (error) {
      //
    }
  }, []);

  function publish(topic, payload) {
    mqttClient.publish(topic, payload);
  }

  // connection manager
  function startConnection(host, port, username, password, useSSL) {
    const client = new MqttClient(host, Number(port), '/mqtt', '');
    // called when the client connects
    function onConnect() {
      setMqttStatus('CONNECTED');
      client.subscribe(channel);
    }
    // called when a message arrives
    function onMessageArrived(message) {
      setMqttMessage(message.payloadString);
    }
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      setMqttStatus('DISCONNECTED');
      if (responseObject.errorCode !== 0) {
        console.log(`onConnectionLost:${responseObject.errorMessage}`);
      }
      try {
        clearInterval(mqttTimer);
        mqttTimer = setInterval(() => {
          if (!client.isConnected()) {
            client.connect({
              onSuccess: onConnect,
              useSSL: useSSL,
              userName: username,
              password: password,
            });
          }
        }, 3000);
      } catch {}
    }

    try {
      // set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      setMQTTClient(client);
      // connect the client
      client.connect({
        onSuccess: onConnect,
        useSSL: useSSL,
        userName: username,
        password: password,
      });
    } catch {
      onConnectionLost();
    }
  }

  return { mqttMessage, mqttStatus, publish };
}
