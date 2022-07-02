import React, { useMemo } from 'react';

import { AllPersonsOptionsDocument } from 'lib/graphql-operations';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewPerson from 'src/Screens/NewPerson';
import NewPlace from 'src/Screens/NewPlace';
import Snackbar from 'src/Components/Snackbar';
import usePlaces from 'src/Logic/usePlaces';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const pageName = 'ویرایش مکان';

export default function newPlace() {
  // access to browser url input
  const router = useRouter();
  // graphql operations for places
  const {
    data,
    loading,
    sending,
    createNew,
    createNewCategory,
    deleteHandler,
  } = usePlaces();
  //
  const { data: personsOptions } = useQuery(AllPersonsOptionsDocument, {
    fetchPolicy: 'network-only',
  });

  // if editing => extract existing user data from query param
  const existingPlace = useMemo(
    () =>
      JSON.parse(
        router?.query?.place ? (router?.query?.place as string) : '{}'
      ),
    [router?.isReady]
  );

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewPlace
        loading={loading}
        sending={sending}
        places={
          (data?.places?.map?.((p) => ({
            id: p?.id,
            label: p?.name,
            isCategory: p?.isCategory,
          })) as any)
        }
        persons={personsOptions?.persons as any}
        existingPlace={existingPlace}
        createNewPlaceHandler={createNew}
        createNewCategoryHandler={createNewCategory}
        deletePlacesHandler={deleteHandler}
        modal={false}
      />
    </Layout>
  );
}
