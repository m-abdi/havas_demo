import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Layout from '../../src/Components/Layout';

const pageName = 'RFID ثبت ورود کپسول به انبار توسط';
export default function enterWarehouseRFID() {
    // states
  const [mqttMessage, setMqttMessage] = useState<string>();
  const [mqttStatus, setMqttStatus] = useState<any>('DISCONNECTED');
//   use
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
    </Layout>
  );
}
