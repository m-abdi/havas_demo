import {
  AllPersonsDocument,
  DeletePersonsDocument,
  PersonFilter,
} from 'lib/graphql-operations';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';

const pageName = 'اشخاص';
export default function persons() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<PersonFilter>({
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
  });

  //
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    snackbarColor,
    setSnackbarColor,
  } = useContext(SnackbarContext);
  // get all persons from graph
  const { data, loading, error, fetchMore } = useQuery(AllPersonsDocument, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters,
    },
  });
  const [deletePersonsMutation, { data: deletedPersons, loading: deleting }] =
    useMutation(DeletePersonsDocument);

  // handlers
  const deletePersons = useCallback(
    async (personIds: string[]): Promise<any> => {
      // provide a response for user interaction(sending...)
      setSnackbarColor('info');
      setSnackbarMessage('در حال ارسال');
      setSnackbarOpen(true);
      try {
        const resp = await deletePersonsMutation({
          variables: { personIds },
          refetchQueries: [{ query: AllPersonsDocument }, 'allPersons'],
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
      // setOffset(0);
      // setPageNumber(0);
      // setLoading(false);
      // setDeleteRoleDialog(false);
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
      <Persons
        loading={loading}
        data={data?.persons ?? ([] as any)}
        allPersonsCount={data?.count as number}
        pageNumber={pageNumber}
        offset={offset}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filters={filters}
        setFilters={setFilters}
        fetchMoreRows={fetchMoreRows}
        deleting={deleting}
        deletePersonsHandler={deletePersons}
      />
      <Snackbar />
    </Layout>
  );
}
