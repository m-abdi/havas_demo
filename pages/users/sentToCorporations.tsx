import {
  AssetTransferWorkflowFilter,
  EquipmentFilter,
} from '../../lib/resolvers-types';
import React, { memo, useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from '../../src/AuthenticationRequired';
import Equipments from '../../src/Components/Pages/Equipments';
import ExitHospitals from '../../src/Components/Pages/ExitHospitals';
import Head from 'next/head';
import Layout from '../../src/Components/Atomic/Layout';
import SentToCorporations from '../../src/Components/Pages/SentToCorporations/SentToCorporations';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های خروج از شرکت';
export default memo(function exitHospitals() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<AssetTransferWorkflowFilter>();

  const {
    sentExitWorkflows,
    sentExitWorkflowsCount,
    allExitWorkflowsLoading: loading,
    deleting,
    deleteHandler,
    fetchMoreSentExitWorkflows: fetchMore,
  } = useWorkflows(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset,
    false,
    false,
    false, 
    false,
    true,
  );

  return (
    <SentToCorporations
      loading={loading}
      data={sentExitWorkflows as any}
      allEquipmentsCount={sentExitWorkflowsCount as number}
      pageNumber={pageNumber}
      offset={offset}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
      fetchMoreRows={fetchMore}
      deleting={deleting}
      deleteHandler={async (workflowIds: string[]) => {
        await deleteHandler(workflowIds, 'sentExitWorkflows');
      }}
    />
  );
})
