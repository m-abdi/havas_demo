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
    registeredEnterWorkflows: data,
    registeredEnterWorkflowsCount: count,
    registeredEnterWorkflowsError: error,
    registeredEnterWorkflowsLoading: loading,
    fetchMoreRegisteredEnterWorkflows: fetchMore,
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
      deleting={false}
      filters={filters}
      setFilters={setFilters}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      offset={offset}
      allWorkflowsCount={count as number}
      fetchMoreRows={fetchMore}
      deleteWorkflowsHandler={async (workflowIds) => {
        return;
      }}
    />
  );
}
