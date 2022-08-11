import {
  AllPersonsOptionsDocument,
  EquipmentsAndPlacesDocument,
} from 'lib/graphql-operations';
import React, { useMemo } from 'react';

import Head from 'next/head';
import Layout from '@/src/Components/Atomic/Layout';
import NewAsset from '@/src/Components/Pages/NewAsset';
import NewEquipment from '@/src/Components/Pages/NewEquipment/NewEquipment';
import NewPerson from '@/src/Components/Pages/NewPerson';
import NewPlace from '@/src/Components/Pages/NewPlace';
import Snackbar from '@/src/Components/Atomic/Snackbar';
import useAssets from 'src/Logic/useAssets';
import useEquipments from 'src/Logic/useEquipments';
import usePlaces from 'src/Logic/usePlaces';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const pageName = 'موجودی جدید';

export default function newAsset() {
  // access to browser url input
  const router = useRouter();
  // graphql operations for getting equipments and places
  const { data, loading } = useQuery(EquipmentsAndPlacesDocument);
  // mutation
  const { createNew, sending } = useAssets();
  // if editing => extract existing asset data from query param
  const existingAsset = useMemo(
    () =>
      JSON.parse(
        router?.query?.asset ? (router?.query?.asset as string) : '{}'
      ),
    [router?.isReady]
  );

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewAsset
        loading={loading}
        sending={sending}
        places={data?.places as any}
        equipments={data?.equipments as any}
        createHandler={createNew}
        existingAsset={existingAsset}
      />
    </Layout>
  );
}
