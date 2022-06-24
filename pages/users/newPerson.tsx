import {
  AllRolesAndPlacesDocument,
  CreateNewPersonDocument,
} from 'lib/graphql-operations';
import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewPerson from 'src/Screens/NewPerson';
import Snackbar from 'src/Components/Snackbar';
import { useRouter } from 'next/router';

const pageName = 'شخص جدید';

export default function newPerson() {
  // access to browser url input
  const router = useRouter();
  // snackbar global states
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    snackbarColor,
    setSnackbarColor,
  } = useContext(SnackbarContext);
  // fetch all roles and places for autocomplete fields
  const { loading, error, data } = useQuery(AllRolesAndPlacesDocument, {
    fetchPolicy: 'cache-and-network',
  });
  // new person mutation to server
  const [
    createPersonMutation,
    { data: createdPerson, loading: sending, error: creationError },
  ] = useMutation(CreateNewPersonDocument);

  // handlers
  const createNewPersonHandler = useCallback(
    async (
      id: string,
      firstNameAndLastName: string,
      placeId: string,
      roleId: string,
      state: string,
      city: string,
      postalCode: string,
      address: string,
      telephone: string,
      mobileNumber: string,
      website: string
    ) => {
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      const createdPerson = await createPersonMutation({
        variables: {
          id,
          firstNameAndLastName,
          placeId,
          roleId,
          state,
          city,
          postalCode,
          address,
          telephone,
          mobileNumber,
          website,
        },
      });
      if (createdPerson.data) {
        setSnackbarColor('success');
        setSnackbarMessage('انجام شد');
        setSnackbarOpen(true);
        router.push('/users/persons');
      } else {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
      }
    },
    []
  );

  return (
    <AuthenticationRequired pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewPerson
        loading={loading}
        sending={sending}
        roles={data?.roles ?? ([] as any)}
        places={data?.places ?? ([] as any)}
        createNewPersonHandler={createNewPersonHandler}
      />
      <Snackbar />
    </AuthenticationRequired>
  );
}
