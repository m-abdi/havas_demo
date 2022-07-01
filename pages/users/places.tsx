import {
  AllPersonsDocument,
  AllPlacesDocument,
  DeletePersonsDocument,
  DeletePlacesDocument,
  PlaceFilter,
} from 'lib/graphql-operations';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import Places from 'src/Screens/Places';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';

const pageName = 'اماکن';
export default function places() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<PlaceFilter>({
    id: { contains: '' },
    name: { contains: '' },
    superPlace: { name: { contains: '' } },
    representative: {
      firstNameAndLastName: { contains: '' },
      role: { name: { contains: '' } },
    },
    typeOfWork: { contains: '' },
    isCategory: false,
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
  });

  //
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // get all persons from graph
  const { data, loading, error, fetchMore } = useQuery(AllPlacesDocument, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters,
    },
  });
  const [deletePlacesMutation, { data: deletedPersons, loading: deleting }] =
    useMutation(DeletePlacesDocument);

  // handlers
  const deletePlaces = useCallback(
    async (placeIds: string[]): Promise<any> => {
      // provide a response for user interaction(sending...)
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      try {
        const resp = await deletePlacesMutation({
          variables: { placeIds: placeIds },
          refetchQueries: [{ query: AllPlacesDocument }, 'allPlaces'],
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
    },
    []
  );

  const fetchMoreRows = useCallback(
    function (
      event: any,
      page: number
      // itemsPerPage: number
    ) {
      try {
        fetchMore({
          variables: {
            offset: itemsPerPage * page,
            limit: itemsPerPage,
            filters,
          },
        });
      } catch {
        console.log('');
      }
      setPageNumber(page);
      setOffset(itemsPerPage * page);
    },
    [itemsPerPage, pageNumber]
  );

  return (
    <Layout pageName={pageName}>
      <Places
        loading={loading}
        data={data?.places ?? ([] as any)}
        allPlacesCount={data?.count as number}
        pageNumber={pageNumber}
        offset={offset}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filters={filters}
        setFilters={setFilters}
        fetchMoreRows={fetchMoreRows}
        deleting={deleting}
        deletePlacesHandler={deletePlaces}
      />
      <Snackbar />
    </Layout>
  );
}
