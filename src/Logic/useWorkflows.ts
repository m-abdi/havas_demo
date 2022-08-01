/* eslint-disable no-var */
import {
  AggregatedTransferedAssets,
  EnterWorkflowFilter,
} from '../../lib/resolvers-types';
import {
  AllEnterWorkflowsDocument,
  AllPersonsDocument,
  ConfirmReceiptByHospitalDocument,
  ConfirmedEnterWorkflowsDocument,
  CreateEnterWorkflowDocument,
  CreateExitWorkflowDocument,
  CreateNewPersonDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
} from '../../lib/graphql-operations';
import { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from '../../pages/_app';
import { TransferedAssets } from '../../lib/resolvers-types';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

export default function useWorkflows(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: EnterWorkflowFilter,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>,
  setOffset?: React.Dispatch<React.SetStateAction<number>>,
  fetchNewEnterWorkflows = false,
  fetchConfirmedEnterWorkflows = false
) {
  const router = useRouter();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // fetch All enter workflows
  const [
    allEnterWorkflowsQuery,
    { data: allEnterWorkflows, error, loading, fetchMore: fetchMoreRows },
  ] = useLazyQuery(AllEnterWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters,
    },
  });

  // enter workflows that are confirmed by hospital
  const [
    confirmedEnterWorkflowsQuery,
    {
      data: confirmedEnterWorkflowsData,
      loading: confirmedEnterWorkflowsLoading,
      error: confirmedEnterWorkflowsError,
      fetchMore: fetchMoreConfirmedEnterWorkflows,
    },
  ] = useLazyQuery(ConfirmedEnterWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        nextStageName: {
          contains: 'RFID ثبت ورود کپسول به انبار توسط',
        },
        ...filters,
      },
    },
  });

  // fetch queries that are requested
  useEffect(() => {
    (async () => {
      if (fetchNewEnterWorkflows) {
        await allEnterWorkflowsQuery();
      } else if (fetchConfirmedEnterWorkflows) {
        await confirmedEnterWorkflowsQuery();
      }
    })();
  }, [filters]);

  // new enter worflow mutation to server
  const [createEnterWorkflowMutation, { loading: sending }] = useMutation(
    CreateEnterWorkflowDocument
  );
  // new exit worflow mutation to server
  const [createExitWorkflowMutation, { loading: sendingNewExitWorkflow }] = useMutation(
    CreateExitWorkflowDocument
  );
  // confirm existing enter worflow mutation to server
  const [
    confirmReceiptByHospitalMutation,
    { loading: confirmReceiptByHospitalSending },
  ] = useMutation(ConfirmReceiptByHospitalDocument, {
    refetchQueries: [{ query: AllEnterWorkflowsDocument }, 'allEnterWorkflows'],
  });
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
  // handlers
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
      assets: TransferedAssets
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
  const createNewExit = useCallback(
    async (
      workflowNumber: string,
      havalehId: string,
      date: string,
      warehouseKeeperId: string,
      deliverer: string,
      description: string,
      transportationName: string,
      transportationTelephone: string,
      transportationTelephone2: string,
      assets: TransferedAssets
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

        const createdEnterWorkflow = await createExitWorkflowMutation({
          variables: {
            workflowNumber,
            havalehId,
            date,
            warehouseKeeperId,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            description,
            deliverer,
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
          router.push('/users/exitWarehouseRFID');
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
  // confirming handler
  const confirmEnterHandler = useCallback(
    async (workflowNumber: string, editedHavalehData: any) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        if (editedHavalehData) {
          const {
            havalehId,
            date,
            deliverer,
            description,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            assets,
          }: {
            havalehId: string;
            date: string;
            deliverer: string;
            description: string;
            transportationName: string;
            transportationTelephone: string;
            transportationTelephone2: string;
            assets: AggregatedTransferedAssets;
          } = editedHavalehData;
          // drop NaN values
          const filteredAssets = Object?.fromEntries(
            Object?.entries(assets as any)?.filter(([key, value]) => value)
          );

          var updatedEnterWorkflow = await confirmReceiptByHospitalMutation({
            variables: {
              workflowNumber,
              havalehId,
              date,
              transportationName,
              transportationTelephone,
              transportationTelephone2,
              description,
              deliverer,
              assets: filteredAssets,
            },
          });
        } else {
          var updatedEnterWorkflow = await confirmReceiptByHospitalMutation({
            variables: {
              workflowNumber,
            },
          });
        }

        if (updatedEnterWorkflow) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          router.push(
            `/users/enterWarehouseRFID?workflow=${JSON.stringify(
              updatedEnterWorkflow?.data?.confirmReceiptByHospital
            )}`
          );
        } else {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        }
      } catch (e) {
        console.log(e.message);

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
    confirmedEnterWorkflows: confirmedEnterWorkflowsData?.enterWorkflows ?? [],
    confirmedEnterWorkflowsCount:
      confirmedEnterWorkflowsData?.enterWorkflowsCount,
    fetchMoreConfirmedEnterWorkflows,
    confirmedEnterWorkflowsLoading,
    confirmedEnterWorkflowsError,
    error,
    loading,
    fetchMore,
    sending,
    createNewEnter,
    confirmEnterHandler,
    deleting,
    deleteHandler,
  };
}
