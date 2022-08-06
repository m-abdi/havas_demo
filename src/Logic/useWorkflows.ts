/* eslint-disable no-var */
import {
  AggregatedTransferedAssets,
  EnterWorkflowFilter,
} from '../../lib/resolvers-types';
import {
  AllEnterWorkflowsDocument,
  AllPersonsDocument,
  AllWorkflowsDocument,
  ConfirmReceiptByCorporationDocument,
  ConfirmReceiptByHospitalDocument,
  ConfirmedEnterWorkflowsDocument,
  CreateEnterWorkflowDocument,
  CreateExitWorkflowDocument,
  CreateNewPersonDocument,
  DeletePersonsDocument,
  DeleteWorkflowsDocument,
  EquipmentsDocument,
  RfidCheckWorkflowsDocument,
} from '../../lib/graphql-operations';
import { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from '../../pages/_app';
import { TransferedAssets } from '../../lib/resolvers-types';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

function dropNullValues(assets: { [key: string]: any }) {
  return Object.fromEntries(
    Object.entries(assets).filter(([key, value]) => value)
  );
}
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
  fetchApprovedExitWorkflows = false,
  fetchSentExitWorkflows = false,
  fetchRecievedExitWorkflows = false,
  fetchRegisteredEnterWorkflows = false
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
      filters: {
        ...filters,
        instanceOfProcessId: 1,
        nextStageName: 'تایید تحویل کپسول به بیمارستان',
      },
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
      filters: {
        ...filters,
        instanceOfProcessId: 2,
        nsn: {
          in: ['RFID ثبت خروج کپسول از انبار توسط', 'قبول درخواست توسط مدیریت'],
        },
      },
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
        nextStageName: 'RFID ثبت ورود کپسول به انبار توسط',
        instanceOfProcessId: 1,
        ...filters,
      },
    },
  });
  // enter workflows that are registered by rfid by hospital
  const [
    registeredEnterWorkflowsQuery,
    {
      data: registeredEnterWorkflowsData,
      loading: registeredEnterWorkflowsLoading,
      error: registeredEnterWorkflowsError,
      fetchMore: fetchMoreRegisteredEnterWorkflows,
    },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        ...filters,
        nextStageName: '',
        instanceOfProcessId: 1,
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
        nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
        instanceOfProcessId: 2,
        ...filters,
      },
    },
  });
  // exit workflows that have been sent to the corporation
  const [
    sentExitWorkflowsQuery,
    {
      data: sentExitWorkflowsData,
      loading: sentExitWorkflowsLoading,
      error: sentExitWorkflowsError,
      fetchMore: fetchMoreSentExitWorkflows,
    },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters: {
        nextStageName: 'تایید تحویل به شرکت',
        instanceOfProcessId: 2,
        ...filters,
      },
    },
  });
  // exit workflows that have been received by the corporation
  const [
    recievedExitWorkflowsQuery,
    {
      data: recievedExitWorkflowsData,
      loading: recievedExitWorkflowsLoading,
      error: recievedExitWorkflowsError,
      fetchMore: fetchMoreRecievedExitWorkflows,
    },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters: {
        ...filters,
        nextStageName: '',
        instanceOfProcessId: 2,
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
      if (fetchSentExitWorkflows) {
        await sentExitWorkflowsQuery();
      }
      if (fetchRecievedExitWorkflows) {
        await recievedExitWorkflowsQuery();
      }
      if (fetchRegisteredEnterWorkflows) {
        await registeredEnterWorkflowsQuery();
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
  // confirm existing exit worflow mutation to server
  const [
    confirmReceiptByCorporationMutation,
    { loading: confirmReceiptByCorporationSending },
  ] = useMutation(ConfirmReceiptByCorporationDocument);
  const [rfidCheckMutation, { loading: rfidCheckMutationSending }] =
    useMutation(RfidCheckWorkflowsDocument);
  // delete
  const [deleteWorkflowsMutation, { loading: deleting }] = useMutation(
    DeleteWorkflowsDocument
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
        const filteredAssets = dropNullValues(assets);

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
          router.push('/users/assetEnterWorkflowsTables');
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
        const filteredAssets = dropNullValues(assets);

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
    async (
      workflowNumber: string,
      editedHavalehData: any,
      receivingDescription?: string
    ) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      console.log('hello obama');

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
          const filteredAssets = dropNullValues(assets);

          var updatedEnterWorkflow = await confirmReceiptByHospitalMutation({
            variables: {
              workflowNumber,
              havalehId,
              date,
              transportationName,
              transportationTelephone,
              transportationTelephone2,
              description,
              receivingDescription,
              deliverer,
              assets: filteredAssets,
            },
          });
        } else {
          var updatedEnterWorkflow = await confirmReceiptByHospitalMutation({
            variables: {
              workflowNumber,
              receivingDescription,
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
  // confirming handler
  const confirmExitHandler = useCallback(
    async (
      workflowNumber: string,
      editedHavalehData: any,
      receivingDescription?: string
    ) => {
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
            description,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            assets,
          }: {
            havalehId: string;
            date: string;
            description: string;
            transportationName: string;
            transportationTelephone: string;
            transportationTelephone2: string;
            assets: AggregatedTransferedAssets;
          } = editedHavalehData;
          // drop NaN values
          const filteredAssets = dropNullValues(assets);

          var updatedEnterWorkflow = await confirmReceiptByCorporationMutation({
            variables: {
              workflowNumber,
              havalehId,
              date,
              transportationName,
              transportationTelephone,
              transportationTelephone2,
              description,
              receivingDescription,
              assets: filteredAssets,
            },
          });
        } else {
          var updatedEnterWorkflow = await confirmReceiptByCorporationMutation({
            variables: {
              workflowNumber,
              receivingDescription,
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
          router.push(`/users/dashboard`);
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
      checkedAssets: AggregatedTransferedAssets,
      assets: AggregatedTransferedAssets
    ) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      if (!Object.values(checkedAssets).some((v) => v)) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen,
          '',
          '',
          'تعداد یکی نیست!'
        );
        return false;
      }
      // Object.entries(checkedAssets)
      //   .filter(([k, v]) => !/type/.test(k) && v)
      //   .forEach(([k, v]) => {
      //     if (v !== assets[k]) {
      //       useNotification(
      //         'error',
      //         setSnackbarColor,
      //         setSnackbarMessage,
      //         setSnackbarOpen,
      //         '',
      //         '',
      //         'تعداد یکی نیست!'
      //       );
      //       return false;
      //     }
      //   });

      try {
        const resp = await rfidCheckMutation({
          variables: {
            workflowNumber,
            processId,
            assets: dropNullValues(checkedAssets),
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
    async (workflowIds: string[], query: string): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      const queryMapper = {
        allExitWorkflows: [
          {
            query: AllWorkflowsDocument,
            variables: {
              offset,
              limit: itemsPerPage,
              filters: {
                ...filters,
                instanceOfProcessId: 2,
                nsn: {
                  in: [
                    'RFID ثبت خروج کپسول از انبار توسط',
                    'قبول درخواست توسط مدیریت',
                  ],
                },
              },
            },
          },
          'allWorkflows',
        ],
        sentExitWorkflows: [
          {
            query: AllWorkflowsDocument,
            variables: {
              offset,
              limit: itemsPerPage,
              filters: {
                nextStageName: 'تایید تحویل به شرکت',
                instanceOfProcessId: 2,
                ...filters,
              },
            },
          },
          'allWorkflows',
        ],
        recievedExitWorkflows: [
          {
            query: AllWorkflowsDocument,
            variables: {
              offset,
              limit: itemsPerPage,
              filters: {
                nextStageName: '',
                instanceOfProcessId: 2,
                ...filters,
              },
            },
          },
          'allWorkflows',
        ],
      };
      try {
        const resp = await deleteWorkflowsMutation({
          variables: { workflowIds },
          refetchQueries: queryMapper?.[query],
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
    registeredEnterWorkflows:
      registeredEnterWorkflowsData?.assetTransferWorkflows ?? [],
    registeredEnterWorkflowsLoading,
    registeredEnterWorkflowsError,
    registeredEnterWorkflowsCount:
      registeredEnterWorkflowsData?.assetTransferWorkflowsCount,
    fetchMoreRegisteredEnterWorkflows,
    recievedExitWorkflows:
      recievedExitWorkflowsData?.assetTransferWorkflows ?? [],
    recievedExitWorkflowsCount:
      recievedExitWorkflowsData?.assetTransferWorkflowsCount,
    recievedExitWorkflowsLoading,
    recievedExitWorkflowsError,
    fetchMoreRecievedExitWorkflows,
    sentExitWorkflows: sentExitWorkflowsData?.assetTransferWorkflows ?? [],
    sentExitWorkflowsCount: sentExitWorkflowsData?.assetTransferWorkflowsCount,
    sentExitWorkflowsLoading,
    sentExitWorkflowsError,
    fetchMoreSentExitWorkflows,
    confirmReceiptByCorporationSending,
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
    confirmExitHandler,
    deleting,
    deleteHandler,
    rfidHandler,
    rfidCheckMutationSending,
  };
}
