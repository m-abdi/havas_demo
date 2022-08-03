/* eslint-disable no-var */
import {
  AggregatedTransferedAssets,
  EnterWorkflowFilter,
} from '../../lib/resolvers-types';
import {
  AllEnterWorkflowsDocument,
  AllPersonsDocument,
  AllWorkflowsDocument,
  ConfirmReceiptByHospitalDocument,
  ConfirmedEnterWorkflowsDocument,
  CreateEnterWorkflowDocument,
  CreateExitWorkflowDocument,
  CreateNewPersonDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
  RfidCheckWorkflowsDocument,
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
  fetchAllEnterWorkflows = false,
  fetchConfirmedEnterWorkflows = false,
  fetchAllExitWorkflows = false,
  fetchApprovedExitWorkflows = false
) {
  const router = useRouter();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // fetch All enter workflows
  const [
    allEnterWorkflowsQuery,
    { data: allEnterWorkflowsData, error, loading, fetchMore: fetchMoreRows },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters: { ...filters, instanceOfProcessId: 1 },
    },
  });
  // fetch All exit workflows
  const [
    allExitWorkflowsQuery,
    {
      data: allExitWorkflowsData,
      error: allExitWorkflowsError,
      loading: allExitWorkflowsLoading,
      fetchMore: fetchMoreExitWorkflows,
    },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters: { ...filters, instanceOfProcessId: 2 },
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
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        nextStageName: {
          contains: 'RFID ثبت ورود کپسول به انبار توسط',
        },
        instanceOfProcessId: 1,
        ...filters,
      },
    },
  });
  // exit workflows that are confirmed by manager
  const [
    approvedExitWorkflowsQuery,
    {
      data: approvedExitWorkflowsData,
      loading: approvedExitWorkflowsLoading,
      error: approvedExitWorkflowsError,
      fetchMore: fetchMoreApprovedExitWorkflows,
    },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        nextStageName: {
          contains: 'RFID ثبت خروج کپسول از انبار توسط',
        },
        instanceOfProcessId: 2,
        ...filters,
      },
    },
  });

  // fetch queries that are requested
  useEffect(() => {
    (async () => {
      if (fetchAllEnterWorkflows) {
        await allEnterWorkflowsQuery();
      }
      if (fetchConfirmedEnterWorkflows) {
        await confirmedEnterWorkflowsQuery();
      }
      if (fetchAllExitWorkflows) {
        await allExitWorkflowsQuery();
      }
      if (fetchApprovedExitWorkflows) {
        await approvedExitWorkflowsQuery();
      }
    })();
  }, [filters]);

  // new enter worflow mutation to server
  const [createEnterWorkflowMutation, { loading: sending }] = useMutation(
    CreateEnterWorkflowDocument
  );
  // new exit worflow mutation to server
  const [createExitWorkflowMutation, { loading: sendingNewExitWorkflow }] =
    useMutation(CreateExitWorkflowDocument);
  // confirm existing enter worflow mutation to server
  const [
    confirmReceiptByHospitalMutation,
    { loading: confirmReceiptByHospitalSending },
  ] = useMutation(ConfirmReceiptByHospitalDocument, {
    refetchQueries: [{ query: AllEnterWorkflowsDocument }, 'allEnterWorkflows'],
  });
  const [rfidCheckMutation, { loading: rfidCheckMutationSending }] =
    useMutation(RfidCheckWorkflowsDocument);
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
      description: string,
      transportationName: string,
      transportationTelephone: string,
      transportationTelephone2: string,
      corporationRepresentativeId: string,
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

        const createdExitWorkflow = await createExitWorkflowMutation({
          variables: {
            workflowNumber,
            havalehId,
            date,
            warehouseKeeperId,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            corporationRepresentativeId,
            description,
            assets: filteredAssets,
          },
        });
        if (createdExitWorkflow) {
          // automatically approved by manager
          if (
            createdExitWorkflow?.data?.createExitWorkflow?.passedStages
              ?.length === 2
          ) {
            useNotification(
              'success',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen
            );
            router.push('/users/exitWarehouseRFID');
          }
          // needs approval -> direct to dashboard
          else if (
            createdExitWorkflow?.data?.createExitWorkflow?.passedStages
              ?.length === 1
          ) {
            useNotification(
              'success',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen,
              'در حال ارسال',
              'منتظر تایید مدیریت'
            );
            router.push('/users/dashboard');
          }
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

  // rfid handler
  const rfidHandler = useCallback(
    async (
      workflowNumber: string,
      processId: number,
      assets: AggregatedTransferedAssets
    ) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await rfidCheckMutation({
          variables: {
            workflowNumber,
            processId,
            assets: Object.fromEntries(
              Object.entries(assets).filter(([k, v]) => v)
            ),
          },
        });
        if (resp.data) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          router.push('/users/dashboard');
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
    allApprovedExitWorkflows:
      approvedExitWorkflowsData?.assetTransferWorkflows ?? [],
    approvedExitWorkflowsLoading,
    allEnterWorkflows: allEnterWorkflowsData?.assetTransferWorkflows ?? [],
    allEnterWorkflowsCount: allEnterWorkflowsData?.assetTransferWorkflowsCount,
    confirmedEnterWorkflows:
      confirmedEnterWorkflowsData?.assetTransferWorkflows ?? [],
    confirmedEnterWorkflowsCount:
      confirmedEnterWorkflowsData?.assetTransferWorkflowsCount,
    fetchMoreConfirmedEnterWorkflows,
    confirmedEnterWorkflowsLoading,
    confirmedEnterWorkflowsError,
    allExitWorkflows: allExitWorkflowsData?.assetTransferWorkflows ?? [],
    allExitWorkflowsCount: allExitWorkflowsData?.assetTransferWorkflowsCount,
    allExitWorkflowsError,
    allExitWorkflowsLoading,
    fetchMoreExitWorkflows,
    error,
    loading,
    fetchMore,
    sending,
    createNewEnter,
    createNewExit,
    confirmEnterHandler,
    deleting,
    deleteHandler,
    rfidHandler,
    rfidCheckMutationSending,
  };
}
