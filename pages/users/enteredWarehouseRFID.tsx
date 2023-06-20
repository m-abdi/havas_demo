import React, { useCallback, useContext, useState } from 'react';

import { AssetTransferWorkflowFilter } from 'lib/graphql-operations';
import ConfirmReceiptByHospitals from '../../src/Components/Pages/ConfirmReceiptByHospitals';
import Layout from '../../src/Components/Atomic/Layout';
import { Workflow } from '../../lib/resolvers-types';
import useEquipments from '../../src/Logic/useEquipments';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های ورودی تایید شده';
export default function confirmReceiptByHospitals() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<AssetTransferWorkflowFilter>();
  // hooks
  const {
    registeredEnterWorkflows: data,
    registeredEnterWorkflowsCount: count,
    registeredEnterWorkflowsError: error,
    registeredEnterWorkflowsLoading: loading,
    fetchMore,
    deleteHandler,
    deleting
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
    false,
    false,
    true
  );
  const { equipmentsList } = useEquipments(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  );

  return (
    <ConfirmReceiptByHospitals
      data={data as any}
      loading={loading}
      deleting={deleting}
      filters={filters}
      setFilters={setFilters}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      offset={offset}
      allWorkflowsCount={count as number}
      fetchMoreRows={fetchMore}
      deleteWorkflowsHandler={async(workflowIds)=> deleteHandler(workflowIds, "enteredWarehouseRFID")}
    />
  );
}
