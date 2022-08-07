import { EnterWorkflowFilter, Workflow } from '../../lib/resolvers-types';
import React, { useCallback, useContext, useState } from 'react';

import ConfirmReceiptByHospitals from '../../src/Screens/ConfirmReceiptByHospitals';
import Layout from '../../src/Components/Layout';
import useEquipments from '../../src/Logic/useEquipments';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های ورودی تایید شده';
export default function confirmReceiptByHospitals() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<EnterWorkflowFilter>();
  // hooks
  const {
    confirmedEnterWorkflows,
    confirmedEnterWorkflowsLoading,
    confirmedEnterWorkflowsError,
    confirmedEnterWorkflowsCount,
    fetchMoreConfirmedEnterWorkflows,
    deleteHandler,
    deleting,
  } = useWorkflows(
    offset,
    pageNumber,
    itemsPerPage,
    filters,
    setPageNumber,
    setOffset,
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
      data={confirmedEnterWorkflows as any}
      loading={confirmedEnterWorkflowsLoading}
      deleting={deleting}
      filters={filters}
      setFilters={setFilters}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      offset={offset}
      allWorkflowsCount={confirmedEnterWorkflowsCount as number}
      fetchMoreRows={fetchMoreConfirmedEnterWorkflows}
      deleteWorkflowsHandler={async (workflowIds) =>
        deleteHandler(workflowIds, 'confirmedReceiptByHospitals')
      }
    />
  );
}
