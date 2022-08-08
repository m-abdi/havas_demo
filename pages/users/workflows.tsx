import { EnterWorkflowFilter, Workflow } from '../../lib/resolvers-types';
import React, { useCallback, useContext, useState } from 'react';

import ConfirmReceiptByHospitalsStories from '../../src/Screens/ConfirmReceiptByHospitals';
import Layout from '../../src/Components/Layout';
import Workflows from '../../src/Screens/Workflows';
import useEquipments from '../../src/Logic/useEquipments';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'تاریخچه گردش کارها';
export default function workflows() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<EnterWorkflowFilter>();
  // hooks
  const {
    allWorkflows: data,
    allWorkflowsCount: count,
    allWorkflowsError: error,
    allWorkflowsLoading: loading,
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
    false,
    true
  );
  return (
    <Layout pageName={pageName}>
      <Workflows data={data} loading={loading} allWorkflowsCount={count} pageNumber={pageNumber} setFilters={setFilters} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} offset={offset} filters={filters} />
    </Layout>
  );
}
