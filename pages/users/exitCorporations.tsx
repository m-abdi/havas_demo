import {
  AllPersonsDocument,
  AllPlacesDocument,
  DeletePersonsDocument,
  DeletePlacesDocument,
  PlaceFilter,
} from '../../lib/graphql-operations';
import React, { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { AssetTransferWorkflowFilter } from 'lib/resolvers-types';
import AuthenticationRequired from '../../src/AuthenticationRequired';
import Equipments from '../../src/Components/Pages/Equipments';
import ExitCorporations from '../../src/Components/Pages/ExitCorporations';
import Head from 'next/head';
import Layout from '@/src/Components/Atomic/Layout';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های خروج از شرکت';
export default function exitCorporations({
  nsn,
  showProcessStages =false,
}: {
  nsn?: any;
  showProcessStages?: boolean | undefined;
}) {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<AssetTransferWorkflowFilter>(
    nsn ? { nsn } : {}
  );

  const {
    allEnterWorkflows,
    allEnterWorkflowsCount,
    loading,
    fetchMore,
    deleting,
    deleteHandler,
    confirmEnterHandler,
  } = useWorkflows(
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
      deleting={deleting}
      showProcessStages={showProcessStages}
      confirmEnterHandler={confirmEnterHandler}
      deleteHandler={async (workflowIds) =>
        deleteHandler(workflowIds, 'exitCorporations')
      }
    />
  );
}
