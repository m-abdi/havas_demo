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
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های خروج از شرکت';
export default memo(function exitHospitals() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<AssetTransferWorkflowFilter>();

  const {
    allExitWorkflows,
    allExitWorkflowsCount,
    allExitWorkflowsLoading: loading,
    deleting,
    deleteHandler,
    fetchMore,
    approveExitHandler
  } = useWorkflows(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset,
    false,
    false,
    true
  );

  return (
      <ExitHospitals
        loading={loading}
        data={allExitWorkflows as any}
        allEquipmentsCount={allExitWorkflowsCount as number}
        pageNumber={pageNumber}
        offset={offset}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filters={filters}
        setFilters={setFilters}
        fetchMoreRows={fetchMore}
        deleting={deleting}
        deleteHandler={deleteHandler}
        approveHandler={approveExitHandler}
      />
  );
})
