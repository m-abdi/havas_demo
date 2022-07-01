import {
  AllPersonsDocument,
  AllPersonsOptionsDocument,
  AllPlacesDocument,
  AllRolesAndPlacesDocument,
  CreateCategoryDocument,
  CreateNewPersonDocument,
  CreatePlaceDocument,
  DeletePlacesDocument,
} from 'lib/graphql-operations';
import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewPerson from 'src/Screens/NewPerson';
import NewPlace from 'src/Screens/NewPlace';
import Snackbar from 'src/Components/Snackbar';
import { useRouter } from 'next/router';

const pageName = 'ویرایش مکان';

export default function newPlace() {
  // access to browser url input
  const router = useRouter();
  // snackbar global states
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // fetch all  places
  const { loading, error, data } = useQuery(AllPlacesDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: 100000,
      offset: 0,
      filters: {
        id: { contains: '' },
        name: { contains: '' },
        superPlace: { name: { contains: '' } },
        representative: {
          firstNameAndLastName: { contains: '' },
          role: { name: { contains: '' } },
        },
        typeOfWork: { contains: '' },
        isCategory: true,
        state: { contains: '' },
        city: { contains: '' },
        postalCode: { contains: '' },
        address: { contains: '' },
        telephone: { contains: '' },
        mobileNumber: { contains: '' },
        website: { contains: '' },
        nationalId: { contains: '' },
        economicalCode: { contains: '' },
        registeredNumber: { contains: '' },
        description: { contains: '' },
      },
    },
  });
  //
  const { data: personsOptions } = useQuery(
    AllPersonsOptionsDocument,
    {
      variables: {
        limit: 1000000,
        offset: 0,
        filters: {
          id: { contains: '' },
          firstNameAndLastName: { contains: '' },
          place: { name: { contains: '' } },
          state: { contains: '' },
          city: { contains: '' },
          postalCode: { contains: '' },
          address: { contains: '' },
          telephone: { contains: '' },
          mobileNumber: { contains: '' },
          website: { contains: '' },
          role: { name: { contains: '' } },
        },
      },
    }
  );
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
  // new category mutation
  const [createCategoryMutation, { data: categoryId }] = useMutation(
    CreateCategoryDocument
  );
  // delete place mutation
  const [deletePlacesMutation] = useMutation(DeletePlacesDocument);

  // handlers

  const createNewPlaceHandler = useCallback(
    async (
      name: string,
      superPlaceId: string,
      representativeId: string,
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
            representativeId,
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
          router.push("/users/places")
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
  const createNewCategoryHandler = useCallback(
    async (name: string, superPlaceId: string) => {
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      try {
        const resp = await createCategoryMutation({
          variables: { name, superPlaceId },
          refetchQueries: [
            { query: AllRolesAndPlacesDocument },
            'allRolesAndPlaces',
          ],
        });
        if (resp.data) {
          setSnackbarColor('success');
          setSnackbarMessage('انجام شد');
          setSnackbarOpen(true);
          return resp.data.createCategory;
        } else {
          setSnackbarColor('error');
          setSnackbarMessage('خطا');
          setSnackbarOpen(true);
          return false;
        }
      } catch {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
        return false;
      }
    },
    []
  );
  const deletePlaces = useCallback(async (placeIds: string[]): Promise<any> => {
    // provide a response for user interaction(sending...)
    setSnackbarColor('info');
    setSnackbarMessage('در حال ارسال');
    setSnackbarOpen(true);
    try {
      const resp = await deletePlacesMutation({
        variables: { placeIds },
        refetchQueries: [
          { query: AllRolesAndPlacesDocument },
          'allRolesAndPlacesDocument',
        ],
      });

      if (resp?.data) {
        setSnackbarColor('success');
        setSnackbarMessage('انجام شد');
        setSnackbarOpen(true);
      } else if (resp?.errors) {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
      }
    } catch (e) {
      setSnackbarColor('error');
      setSnackbarMessage('خطا');
      setSnackbarOpen(true);
    }
  }, []);
  // if editing => extract existing user data from query param
  const existingPlace = useMemo(
    () =>
      JSON.parse(
        router?.query?.place ? (router?.query?.place as string) : '{}'
      ),
    [router?.isReady]
  );
  // // check for editing mode
  // useEffect(() => {
  //   if (router?.isReady) {
  //     setEditRoleCheck(true);
  //   }
  // }, [router?.isReady]);
  console.log(data);

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <NewPlace
        loading={loading}
        sending={sending}
        places={
          data?.places?.map((p) => ({
            id: p.id,
            label: p.name,
            isCategory: p.isCategory,
          })) as any
        }
        persons={personsOptions?.persons as any}
        existingPlace={existingPlace}
        createNewPlaceHandler={createNewPlaceHandler}
        createNewCategoryHandler={createNewCategoryHandler}
        deletePlacesHandler={deletePlaces}
      />
      <Snackbar />
    </Layout>
  );
}
