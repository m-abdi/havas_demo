import {
  AllPersonsDocument,
  AllPlacesDocument,
  DeletePersonsDocument,
  DeletePlacesDocument,
  PlaceFilter,
} from 'lib/graphql-operations';
import { AssetFilter, EquipmentFilter } from 'lib/resolvers-types';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Assets from 'src/Screens/Assets';
import AuthenticationRequired from 'src/AuthenticationRequired';
import Equipments from 'src/Screens/Equipments';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import Places from 'src/Screens/Places';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';
import useAssets from 'src/Logic/useAssets';
import useEquipments from 'src/Logic/useEquipments';
import usePlaces from 'src/Logic/usePlaces';

const pageName = 'موجودی';
export default function assets() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<AssetFilter>({
    equipment: { name: { contains: '' } },
    publicPropertyCode: { contains: '' },
    place: { name: { contains: '' } },
  });

  const { loading, data, fetchMore, deleting, deleteHandler } = useAssets(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset
  );

  return (
    <Layout pageName={pageName}>
      <Assets
        loading={loading}
        data={data?.assets ?? ([] as any)}
        allAssetsCount={data?.count as number}
        pageNumber={pageNumber}
        offset={offset}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filters={filters}
        setFilters={setFilters}
        fetchMoreRows={fetchMore}
        deleting={deleting}
        deleteAssetsHandler={deleteHandler}
      />
    </Layout>
  );
}
