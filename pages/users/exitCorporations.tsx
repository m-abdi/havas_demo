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
import ExitCorporations from '../../src/Screens/ExitCorporations/ExitCorporations';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import Persons from 'src/Screens/Persons';
import Places from 'src/Screens/Places';
import Snackbar from 'src/Components/Snackbar';
import { SnackbarContext } from 'pages/_app';
import useEquipments from 'src/Logic/useEquipments';
import usePlaces from 'src/Logic/usePlaces';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های خروج از شرکت';
export default function exitCorporations() {
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

  const { allEnterWorkflows, loading, sending, fetchMore } = useWorkflows(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset
  );

  return (
    <Layout pageName={pageName}>
      <ExitCorporations
        loading={loading}
        data={allEnterWorkflows?.enterWorkflows ?? ([] as any)}
        allEquipmentsCount={allEnterWorkflows?.enterWorkflowsCount as number}
        pageNumber={pageNumber}
        offset={offset}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filters={filters}
        setFilters={setFilters}
        fetchMoreRows={fetchMore}
        // deleting={deleting}
        // deleteEquipmentsHandler={deleteHandler}
      />
    </Layout>
  );
}
