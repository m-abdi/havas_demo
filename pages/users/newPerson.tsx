import {
  AllPlacesDocument,
  AllRolesAndPlacesDocument,
  CreateNewPersonDocument,
  CreatePlaceDocument,
} from 'lib/graphql-operations';
import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

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
  // new place mutation
  const [
    createPlaceMutation,
    { data: createdPlace, loading: sendingPlace, error: errorPlace },
  ] = useMutation(CreatePlaceDocument);
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
      website: string,
      edit: string
    ) => {
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      try {
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
            edit,
          },
        });
        if (createdPerson) {
          setSnackbarColor('success');
          setSnackbarMessage('انجام شد');
          setSnackbarOpen(true);
          router.push('/users/persons');
        } else {
          setSnackbarColor('error');
          setSnackbarMessage('خطا');
          setSnackbarOpen(true);
        }
      } catch (e) {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
      }
    },
    []
  );
  const createNewPlaceHandler = useCallback(
    async (
      name: string,
      superPlaceId: string,
      typeOfWork: string,
      state: string,
      city: string,
      postalCode: string,
      address: string,
      telephone: string,
      mobileNumber: string,
      website: string,
      nationalId: string,
      economicalCode: string,
      registeredNumber: string,
      description: string,
      edit: string
    ) => {
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      try {
        const createdPlace = await createPlaceMutation({
          variables: {
            name,
            superPlaceId,
            typeOfWork,
            state,
            city,
            postalCode,
            address,
            telephone,
            mobileNumber,
            website,
            nationalId,
            economicalCode,
            registeredNumber,
            description,
            edit,
          },
          refetchQueries: [{ query: AllPlacesDocument }, 'allPlaces'],
        });
        if (createdPlace.data) {
          setSnackbarColor('success');
          setSnackbarMessage('انجام شد');
          setSnackbarOpen(true);
          return createdPlace.data.createPlace;
        } else {
          setSnackbarColor('error');
          setSnackbarMessage('خطا');
          setSnackbarOpen(true);
          return false;
        }
      } catch (e) {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
        return false;
      }
    },
    []
  );


  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewPerson
        loading={loading}
        sending={sending}
        roles={data?.roles ?? ([] as any)}
        places={data?.places?.map((p) => ({ id: p.id, label: p.name })) as any}
        allPlaces={data?.places as any}
        createNewPersonHandler={createNewPersonHandler}
        createNewPlaceHandler={createNewPlaceHandler}
      />
      <Snackbar />
    </Layout>
  );
}
