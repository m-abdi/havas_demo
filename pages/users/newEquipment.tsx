import React, { useMemo } from 'react';

import { AllPersonsOptionsDocument } from 'lib/graphql-operations';
import Head from 'next/head';
import Layout from '../../src/Components/Atomic/Layout';
import NewEquipment from '../../src/Components/Pages/NewEquipment/NewEquipment';
import NewPerson from '../../src/Components/Pages/NewPerson';
import NewPlace from '../../src/Components/Pages/NewPlace';
import Snackbar from '../../src/Components/Atomic/Snackbar';
import useEquipments from 'src/Logic/useEquipments';
import usePlaces from 'src/Logic/usePlaces';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const pageName = 'تجهیز جدید';

export default function newEquipment() {
  // access to browser url input
  const router = useRouter();
  // graphql operations for getting factories
  const { data, loading } = usePlaces(undefined, undefined, undefined, undefined, undefined, undefined, true);
  //
  const { sending, createNew } = useEquipments();
  //
  const { data: personsOptions } = useQuery(AllPersonsOptionsDocument, {
    fetchPolicy: 'network-only',
  });

  // if editing => extract existing equipment data from query param
  const existingEquipment = useMemo(
    () =>
      JSON.parse(
        router?.query?.equipment ? (router?.query?.equipment as string) : '{}'
      ),
    [router?.isReady]
  );

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewEquipment
        loading={loading}
        sending={sending}
        factories={
          data?.places?.map?.((p) => ({
            id: p?.id,
            label: p?.name,
            isCategory: p?.isCategory,
          })) as any
        }
        createHandler={createNew}
        existingEquipment={existingEquipment}
      />
    </Layout>
  );
}
