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
import { EquipmentFilter } from 'lib/resolvers-types';
import Equipments from 'src/Screens/Equipments';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import Places from 'src/Screens/Places';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';
import useEquipments from 'src/Logic/useEquipments';
import usePlaces from 'src/Logic/usePlaces';

const pageName = 'تجهیزات';
export default function equipments() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<EquipmentFilter>({
    name: { contains: '' },
    model: { contains: '' },
    factory: { contains: '' },
    serialNumber: { contains: '' },
    productionYear: { contains: '' },
    installationYear: { contains: '' },
    terminologyCode: { contains: '' },
    supportCompany: { contains: '' },
    supportMobile: { contains: '' },
    supportTelephone: { contains: '' },
  });

  const { loading, data, fetchMore, deleting, deleteHandler } = useEquipments(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset
  );

  return (
    <Layout pageName={pageName}>
      <Equipments
        loading={loading}
        data={data?.equipments ?? ([] as any)}
        allEquipmentsCount={data?.count as number}
        pageNumber={pageNumber}
        offset={offset}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filters={filters}
        setFilters={setFilters}
        fetchMoreRows={fetchMore}
        deleting={deleting}
        deleteEquipmentsHandler={deleteHandler}
      />
    </Layout>
  );
}
