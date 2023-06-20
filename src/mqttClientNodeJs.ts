import * as mqtt from 'mqtt'; // import connect from mqtt
const options = {
  host: 'de4644de4ac941aea974d2a31f240e66.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: '@mehdiabdi1995',
  password: '6aJ5V77Wmzn6)E',
};

const options1: any = {
  host: 'localhost',
  port: 1883,
  protocol: 'tcp',
};

export default async function main(mess = '') {
  //initialize the MQTT client
  let client = mqtt.connect(options1);

  //setup the callbacks
  client.on('connect', function () {
    console.log('Connected');
  });

  client.on('error', function (error) {
    console.log(error);
  });

  client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());
  });

  // subscribe to topic 'my/test/topic'
  client.subscribe('rfid');

  // publish message 'Hello' to topic 'my/test/topic'
  client.publish('rfid', mess);
  client.end();
  return true;
}

export function connect(options1: {
  host: string;
  port: number;
  protocol: string;
}) {
  throw new Error('Function not implemented.');
}
