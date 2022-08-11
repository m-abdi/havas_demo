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
import Layout from '@/src/Components/Atomic/Layout';
import Persons from '@/src/Components/Pages/Persons';
import Places from '@/src/Components/Pages/Places';
import Snackbar from '@/src/Components/Atomic/Snackbar';
import { SnackbarContext } from 'pages/_app';
import usePlaces from 'src/Logic/usePlaces';

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

  const { loading, data, fetchMore, deleting, deleteHandler } = usePlaces(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset,
    true
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
        fetchMoreRows={fetchMore}
        deleting={deleting}
        deletePlacesHandler={deleteHandler}
      />
    </Layout>
  );
}
