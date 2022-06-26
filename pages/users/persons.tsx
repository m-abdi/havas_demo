import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import React from 'react';

const pageName = 'اشخاص';
export default function persons() {
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <Persons
        data={[
          {
            id: '0520649875',
            firstNameAndLastName: 'مهدی عبدی',
            place: { name: 'دفتر مدیریت', id: 'woeirowire' },
            role: { name: 'مدیریت', id: 'woeirowire' },
            state: 'مرکزی',
            city: 'اراک',
            postalCode: '۹۸۹۹۸۷',
            address: 'اراک خیابان ملک',
            telephone: '984965665',
            mobileNumber: '09371246685',
            website: 'mehdiabdi.info',
          },
          {
            id: '052064۵۶۵۱75',
            firstNameAndLastName: 'حسین آرمان پور',
            place: { name: 'دفتر مدیریت', id: 'woeirowire' },
            role: { name: 'مدیریت', id: 'woeirowire' },
            state: 'هرمزگان',
            city: 'بندرعباس',
            postalCode: '78989',
            address: 'بندرعباس',
            telephone: '۸۹۴۹۸۸۹',
            mobileNumber: '656898',
            website: '',
          },

        ]}
      />
    </Layout>
  );
}
