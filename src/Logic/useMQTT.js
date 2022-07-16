import { Client as MqttClient } from '../paho-mqtt';

export function useMQTT(setMessage, setConnectionStatus) {
  // Create a client instance
  const client = new MqttClient(
    process.env.NEXT_PUBLIC_MQTT_BROKER_URL,
    Number(process.env.NEXT_PUBLIC_MQTT_BROKER_PORT),
    '/mqtt',
    '',
  );
  // called when the client connects
  function onConnect() {
    setConnectionStatus('Connected');
    client.subscribe('rfid');
  }
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log(`onConnectionLost:${responseObject.errorMessage}`);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    setMessage(message.payloadString);
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
