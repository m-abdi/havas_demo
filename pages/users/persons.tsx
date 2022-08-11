import {
  AllPersonsDocument,
  DeletePersonsDocument,
  PersonFilter,
} from 'lib/graphql-operations';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Head from 'next/head';
import Layout from '@/src/Components/Atomic/Layout';
import Persons from '@/src/Components/Pages/Persons';
import Snackbar from '@/src/Components/Atomic/Snackbar';
import { SnackbarContext } from 'pages/_app';
import usePersons from 'src/Logic/usePersons';

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
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // get all persons from graph
  const {
    data,
    loading,
    error,
    fetchMore: fetchMoreRows,
    deleting,
    deleteHandler,
  } = usePersons(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset
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
        deletePersonsHandler={deleteHandler}
      />
    </Layout>
  );
}
