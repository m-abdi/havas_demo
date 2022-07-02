import {
  AllPlacesDocument,
  AllRolesAndPlacesDocument,
  CreateCategoryDocument,
  CreateNewPersonDocument,
  CreatePlaceDocument,
  DeletePlacesDocument,
} from 'lib/graphql-operations';
import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewPerson from 'src/Screens/NewPerson';
import Snackbar from 'src/Components/Snackbar';
import useNotification from 'src/Logic/useNotification';
import usePersons from 'src/Logic/usePersons';
import usePlaces from 'src/Logic/usePlaces';
import { useRouter } from 'next/router';

const pageName = 'شخص جدید';

export default function newPerson() {
  // access to browser url input
  const router = useRouter();

  // fetch all roles and places for autocomplete fields
  const { loading, error, data } = useQuery(AllRolesAndPlacesDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const { createNew: createNewPersonHandler, sending } = usePersons();
  const {
    createNew: createNewPlaceHandler,
    createNewCategory: createNewCategoryHandler,
    deleteHandler: deletePlaces,
    deleting,
  } = usePlaces();

  return (
    <Layout pageName={pageName}>
      <NewPerson
        loading={loading || deleting}
        sending={sending}
        roles={data?.roles ?? ([] as any)}
        places={data?.places}
        allPlaces={data?.places as any}
        createNewPersonHandler={createNewPersonHandler}
        createNewPlaceHandler={createNewPlaceHandler}
        createNewCategoryHandler={createNewCategoryHandler}
        deletePlacesHandler={deletePlaces}
      />
    </Layout>
  );
}
