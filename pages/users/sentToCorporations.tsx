import {
  AllPersonsDocument,
  AllPlacesDocument,
  DeletePersonsDocument,
  DeletePlacesDocument,
  PlaceFilter,
} from '../../lib/graphql-operations';
import React, { memo, useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from '../../src/AuthenticationRequired';
import {
  EquipmentFilter,
} from '../../lib/resolvers-types';
import Equipments from '../../src/Screens/Equipments';
import ExitHospitals from '../../src/Screens/ExitHospitals';
import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import SentToCorporations from '../../src/Screens/SentToCorporations/SentToCorporations';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'حواله های خروج از شرکت';
export default memo(function exitHospitals() {
  // states
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<EnterWorkflowFilter>();

  const {
    sentExitWorkflows,
    sentExitWorkflowsCount,
    allExitWorkflowsLoading: loading,
    sending,
    fetchMoreExitWorkflows: fetchMore,
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
      // deleting={deleting}
      // deleteEquipmentsHandler={deleteHandler}
    />
  );
})
