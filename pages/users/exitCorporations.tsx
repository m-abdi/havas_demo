import {
  AllPersonsDocument,
  AllPlacesDocument,
  DeletePersonsDocument,
  DeletePlacesDocument,
  PlaceFilter,
} from '../../lib/graphql-operations';
import {
  EnterWorkflowFilter,
  EquipmentFilter,
} from '../../lib/resolvers-types';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from '../../src/AuthenticationRequired';
import Equipments from '../../src/Screens/Equipments';
import ExitCorporations from '../../src/Screens/ExitCorporations/ExitCorporations';
import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های خروج از شرکت';
export default function exitCorporations() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<EnterWorkflowFilter>();

  const { allEnterWorkflows, allEnterWorkflowsCount, loading, sending, fetchMore } = useWorkflows(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset,
    true
  );

  return (
      <ExitCorporations
        loading={loading}
        data={allEnterWorkflows as any}
        allEquipmentsCount={allEnterWorkflowsCount as number}
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
  );
}
