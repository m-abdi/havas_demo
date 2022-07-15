import {
  AllEnterWorkflowsDocument,
  AllPersonsDocument,
  CreateEnterWorkflowDocument,
  CreateEquipmentDocument,
  CreateNewPersonDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
} from 'lib/graphql-operations';
import { EquipmentFilter, PersonFilter } from 'lib/resolvers-types';
import { useCallback, useContext } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from 'pages/_app';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

export default function useWorkflows(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  fetchEnterWorkflows = false,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>,
  setOffset?: React.Dispatch<React.SetStateAction<number>>
) {
  const router = useRouter();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // fetch All enter workflows
  const {
    data: allEnterWorkflows,
    error,
    loading,
    fetchMore: fetchMoreRows,
  } = useQuery(AllEnterWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
    },
  });

  // new person mutation to server
  const [createEnterWorkflowMutation, { loading: sending }] = useMutation(
    CreateEnterWorkflowDocument
  );
  // delete
  const [deleteEquipmentsMutation, { loading: deleting }] = useMutation(
    DeleteEquipmentsDocument
  );
  // handlers
  // pagination handler
  const fetchMore = useCallback(
    function (
      event: any,
      page: number
      // itemsPerPage: number
    ) {
      try {
        fetchMoreRows({
          variables: {
            offset: itemsPerPage * page,
            limit: itemsPerPage,
            filters,
          },
        });
      } catch {
        console.log('');
      }
      setPageNumber?.(page);
      setOffset?.(itemsPerPage * page);
    },
    [itemsPerPage, pageNumber]
  );
  // creation handler
  const createNewEnter = useCallback(
    async (
      workflowNumber: string,
      havalehId: string,
      date: string,
      corporationRepresentativeId: string,
      deliverer: string,
      description: string,
      transportationName: string,
      transportationTelephone: string,
      transportationTelephone2: string,
      edit: string,
      assets: {
        oxygen_50l_factory: number;
        bihoshi_50l_factory: number;
        shaft_50l_factory: number;
        controlValve_50l_factory: number;
        co2_50l_factory: number;
        argon_50l_factory: number;
        azete_50l_factory: number;
        dryAir_50l_factory: number;
        entonox_50l_factory: number;
        acetylene_50l_factory: number;
        lpg_50l_factory: number;
        oxygen_50l_customer: number;
        bihoshi_50l_customer: number;
        shaft_50l_customer: number;
        controlValve_50l_customer: number;
        co2_50l_customer: number;
        argon_50l_customer: number;
        azete_50l_customer: number;
        dryAir_50l_customer: number;
        entonox_50l_customer: number;
        acetylene_50l_customer: number;
        lpg_50l_customer: number;
        oxygen_40l_factory: number;
        bihoshi_40l_factory: number;
        shaft_40l_factory: number;
        controlValve_40l_factory: number;
        co2_40l_factory: number;
        argon_40l_factory: number;
        azete_40l_factory: number;
        dryAir_40l_factory: number;
        entonox_40l_factory: number;
        acetylene_40l_factory: number;
        lpg_40l_factory: number;
        oxygen_40l_customer: number;
        bihoshi_40l_customer: number;
        shaft_40l_customer: number;
        controlValve_40l_customer: number;
        co2_40l_customer: number;
        argon_40l_customer: number;
        azete_40l_customer: number;
        dryAir_40l_customer: number;
        entonox_40l_customer: number;
        acetylene_40l_customer: number;
        lpg_40l_customer: number;
      }
    ) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        // drop NaN values
        const filteredAssets = Object.fromEntries(
          Object.entries(assets).filter(([key, value]) => value)
        );

        const createdEnterWorkflow = await createEnterWorkflowMutation({
          variables: {
            workflowNumber,
            havalehId,
            date,
            corporationRepresentativeId,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            description,
            deliverer,
            edit,
            assets: filteredAssets,
          },
        });
        if (createdEnterWorkflow) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          router.push('/users/exitCorporations');
        } else {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        }
      } catch (e) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen
        );
      }
    },
    []
  );

  // handlers
  const deleteHandler = useCallback(
    async (equipmentIds: string[]): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await deleteEquipmentsMutation({
          variables: { equipmentIds },
          refetchQueries: [{ query: EquipmentsDocument }, 'equipments'],
        });

        if (resp?.data) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        } else if (resp?.errors) {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        }
      } catch (e) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen
        );
      }
      // setOffset(0);
      // setPageNumber(0);
      // setLoading(false);
      // setDeleteRoleDialog(false);
    },
    []
  );
  return {
    allEnterWorkflows,
    allHavaleh: allEnterWorkflows?.enterWorkflows.map(
      (ew) => ew?.passedStages?.[0]?.havaleh
    ),
    error,
    loading,
    fetchMore,
    sending,
    createNewEnter,
    deleting,
    deleteHandler,
  };
}
