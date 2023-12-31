import {
  AllPersonsDocument,
  AllPlacesDocument,
  DeletePersonsDocument,
  DeletePlacesDocument,
  PlaceFilter,
} from '../../lib/graphql-operations';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from '../../src/AuthenticationRequired';
import { EquipmentFilter } from '../../lib/resolvers-types';
import Equipments from '../../src/Components/Pages/Equipments';
import Head from 'next/head';
import Layout from '../../src/Components/Atomic/Layout';
import Persons from '../../src/Components/Pages/Persons';
import Places from '../../src/Components/Pages/Places';
import Snackbar from '../../src/Components/Atomic/Snackbar';
import { SnackbarContext } from '../../pages/_app';
import useEquipments from '../../src/Logic/useEquipments';
import usePlaces from '../../src/Logic/usePlaces';

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
    supportCompany: { name: { contains: '' } },
    supportTelephone1: { contains: '' },
    supportTelephone2: { contains: '' },
  });

  const { loading, data, fetchMore, deleting, deleteHandler } = useEquipments(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset,
    false,true,
    
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
