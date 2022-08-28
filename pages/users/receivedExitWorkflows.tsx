import React, { useCallback, useContext, useState } from 'react';

import { AssetTransferWorkflowFilter } from 'lib/graphql-operations';
import ConfirmReceiptByCorporations from '../../src/Components/Pages/ConfirmReceiptByCorporations/ConfirmReceiptByCorporations';
import ConfirmReceiptByHospitals from '../../src/Components/Pages/ConfirmReceiptByHospitals';
import Layout from '@/src/Components/Atomic/Layout';
import { Workflow } from '../../lib/resolvers-types';
import { receiveMessageOnPort } from 'worker_threads';
import useEquipments from '../../src/Logic/useEquipments';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های ورودی تایید شده';
export default function confirmReceiptByCorporations() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<AssetTransferWorkflowFilter>();
  // hooks
  const {
    recievedExitWorkflows,
    recievedExitWorkflowsCount,
    recievedExitWorkflowsLoading,
    deleting,
    fetchMore,
    deleteHandler,
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
    console.log(recievedExitWorkflows);
    
  return (
    <ConfirmReceiptByCorporations
      data={recievedExitWorkflows as any}
      loading={recievedExitWorkflowsLoading}
      deleting={deleting}
      filters={filters}
      setFilters={setFilters}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      offset={offset}
      allWorkflowsCount={recievedExitWorkflowsCount as number}
      fetchMoreRows={fetchMore}
      deleteHandler={async (workflowIds: string[]) => {
        await deleteHandler(workflowIds, 'recievedExitWorkflows');
      }}
    />
  );
}
