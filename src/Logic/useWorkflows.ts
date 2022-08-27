/* eslint-disable no-var */
import {
  AggregatedTransferedAssets,
  AssetTransferWorkflowFilter,
} from '../../lib/resolvers-types';
import {
  AllPersonsDocument,
  AllWorkflowsDocument,
  ApproveExitWorkflowDocument,
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
import useAssets from './useAssets';
import useNotification from './useNotification';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function dropNullValues(assets: { [key: string]: any }) {
  return Object.fromEntries(
    Object.entries(assets).filter(([key, value]) => value)
  );
}

export default function useWorkflows(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: AssetTransferWorkflowFilter,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>,
  setOffset?: React.Dispatch<React.SetStateAction<number>>,
  fetchAllEnterWorkflows = false,
  fetchConfirmedEnterWorkflows = false,
  fetchAllExitWorkflows = false,
  fetchApprovedExitWorkflows = false,
  fetchSentExitWorkflows = false,
  fetchRecievedExitWorkflows = false,
  fetchRegisteredEnterWorkflows = false,
  fetchAllWorkflows = false
) {
  const router = useRouter();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  //
  const { data: session } = useSession();
  const queryMapper: any = {
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
              in: ['قبول درخواست توسط مدیریت'],
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
    confirmedReceiptByHospitals: [
      {
        query: AllWorkflowsDocument,
        variables: {
          offset,
          limit: itemsPerPage,
          filters: {
            nextStageName: 'RFID ثبت ورود کپسول به انبار توسط',
            instanceOfProcessId: 1,
            ...filters,
          },
        },
      },
      'allWorkflows',
    ],
    exitCorporations: [
      {
        query: AllWorkflowsDocument,
        variables: {
          offset,
          limit: itemsPerPage,
          filters: {
            nsn: {
              in: [
                'RFID ثبت خروج کپسول از انبار توسط',
                'قبول درخواست توسط مدیریت',
              ],
            },
            instanceOfProcessId: 1,
            ...filters,
          },
        },
      },
      'allWorkflows',
    ],
    enteredWarehouseRFID: [
      {
        query: AllWorkflowsDocument,
        variables: {
          offset,
          limit: itemsPerPage,
          filters: {
            nextStageName: '',
            instanceOfProcessId: 1,
            ...filters,
          },
        },
      },
      'allWorkflows',
    ],
    allWorkflows: [
      {
        query: AllWorkflowsDocument,
        variables: {
          offset,
          limit: itemsPerPage,
        },
      },
      'allWorkflows',
    ],
  };
  // all workflows
  const [
    allWorkflowsQuery,
    {
      data: allWorkflowsData,
      loading: allWorkflowsLoading,
      error: allWorkflowsError,
      fetchMore: fetchMoreAllWorkflows,
    },
  ] = useLazyQuery(AllWorkflowsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { filters, limit: itemsPerPage, offset },
  });

  // fetch All enter workflows
  const [
    allEnterWorkflowsQuery,
    {
      data: allEnterWorkflowsData,
      error,
      loading,
      fetchMore: fetchMoreEnterWorkflows,
    },
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
          in: ['قبول درخواست توسط مدیریت'],
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
      if (fetchAllWorkflows) {
        await allWorkflowsQuery();
      }
    })();
  }, [filters, itemsPerPage, offset]);

  // new enter worflow mutation to server
  const [createEnterWorkflowMutation, { loading: sending }] = useMutation(
    CreateEnterWorkflowDocument
  );
  // new exit worflow mutation to server
  const [
    createExitWorkflowMutation,
    { loading: sendingNewExitWorkflow, error: createExitWorkflowError },
  ] = useMutation(CreateExitWorkflowDocument);
  // confirm existing enter worflow mutation to server
  const [
    confirmReceiptByHospitalMutation,
    { loading: confirmReceiptByHospitalSending },
  ] = useMutation(ConfirmReceiptByHospitalDocument, {
    refetchQueries: [{ query: AllWorkflowsDocument }, 'allWorkflows'],
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
  // approve requested exit workflow
  const [approveExitWorkflowQuery, { data: approvedExitWorkflowNumber }] =
    useMutation(ApproveExitWorkflowDocument);
  // handlers
  // pagination handler
  const fetchMore: any = useCallback(
    function (
      event: any,
      page: number
      // itemsPerPage: number
    ) {
      try {
        if (fetchAllEnterWorkflows) {
          fetchMoreEnterWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
        if (fetchConfirmedEnterWorkflows) {
          fetchMoreConfirmedEnterWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
        if (fetchAllExitWorkflows) {
          // await allExitWorkflowsQuery();
        }
        if (fetchApprovedExitWorkflows) {
          fetchMoreApprovedExitWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
        if (fetchSentExitWorkflows) {
          fetchMoreSentExitWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
        if (fetchRecievedExitWorkflows) {
          fetchMoreRecievedExitWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
        if (fetchRegisteredEnterWorkflows) {
          fetchMoreRecievedExitWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
        if (fetchAllWorkflows) {
          fetchMoreAllWorkflows({
            variables: {
              offset: itemsPerPage * page,
              limit: itemsPerPage,
              filters,
            },
          });
        }
      } catch {
        console.log('');
      }
      setPageNumber?.(page);
      setOffset?.(itemsPerPage * page);
    },
    [itemsPerPage, pageNumber, filters]
  );
  // handlers
  // creation handler
  const createNewEnter = useCallback(
    async (
      workflowNumber: string,
      havalehId: string,
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

        const { data: createdEnterWorkflow, errors: createEnterWorkflowError } =
          await createEnterWorkflowMutation({
            variables: {
              workflowNumber,
              havalehId,
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
          router.push('/users/dashboard');
        } else if (createEnterWorkflowError) {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen,
            '',
            '',
            createEnterWorkflowError?.toString()
          );
        } else {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        }
      } catch (e: any) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen,
          '',
          '',
          e?.message
        );
      }
    },
    []
  );
  const createNewExit = useCallback(
    async (
      havalehId: string,
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

        const { data: createdExitWorkflow, errors: createExitWorkflowError } =
          await createExitWorkflowMutation({
            variables: {
              havalehId,
              warehouseKeeperId,
              transportationName,
              transportationTelephone,
              transportationTelephone2,
              corporationRepresentativeId,
              description,
              assets: filteredAssets,
            },
          });
        console.log(createExitWorkflowError);

        if (createdExitWorkflow) {
          // automatically approved by manager
          if (
            createdExitWorkflow?.createExitWorkflow?.passedStages?.length === 2
          ) {
            useNotification(
              'success',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen
            );
            router.push(
              `/users/exitWarehouseRFID?workflow=${JSON.stringify(
                createdExitWorkflow?.createExitWorkflow
              )}`
            );
          }
          // needs approval -> direct to dashboard
          else if (
            createdExitWorkflow?.createExitWorkflow?.passedStages?.length === 1
          ) {
            useNotification(
              'success',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen,
              'در حال ارسال',
              'منتظر تایید مدیریت'
            );
            router.push('/users/assetExitWorkflowsTables');
          } else if (
            createdExitWorkflow?.createExitWorkflow?.passedStages?.length === 3
          ) {
            useNotification(
              'success',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen,
              'در حال ارسال',
              'منتظر تایید مدیریت'
            );
            router.push('/users/assetExitWorkflowsTables');
          }
        } else if (createExitWorkflowError) {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen,
            '',
            '',
            createExitWorkflowError?.toString()
          );
        } else {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        }
      } catch (e: any) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen,
          '',
          '',
          e?.message
        );
      }
    },
    [createExitWorkflowError]
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
            deliverer,
            description,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            assets,
          }: {
            havalehId: string;
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

          if (
            updatedEnterWorkflow?.data?.confirmReceiptByHospital?.passedStages
              ?.length === 2
          ) {
            router.push(
              `/users/enterWarehouseRFID?workflow=${JSON.stringify(
                updatedEnterWorkflow?.data?.confirmReceiptByHospital
              )}`
            );
          }
          router.push('/users/dashboard');
        } else {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
        }
      } catch (e: any) {
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
            description,
            transportationName,
            transportationTelephone,
            transportationTelephone2,
            assets,
          }: {
            havalehId: string;
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
      } catch (e: any) {
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
      checkedAssetsIds: string[],
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
      function giveMeAggregatedAssets(assets: {
        [key: string]: number | null;
      }) {
        return Object.fromEntries(
          Object.entries(assets).filter(
            ([key, value]) =>
              value &&
              !/factory/.test(key) &&
              !/customer/.test(key) &&
              !/type/.test(key)
          )
        );
      }
      function sameAssetsCheck(
        assets: { [key: string]: number },
        checkedAssets: { [key: string]: number }
      ) {
        console.log(assets, checkedAssets);

        Object.keys(assets).forEach((ak) => {
          if (!Object.keys(checkedAssets).includes(ak)) {
            return false;
          }
        });
        return true;
      }
      function emptyAssetsCheck(checkedAssets: {
        [key: string]: number | null;
      }) {
        return Object.values(checkedAssets).some((v) => v);
      }
      function assetsCountCheck(
        assets: { [key: string]: number },
        checkedAssets: { [key: string]: number }
      ) {
        Object.entries(checkedAssets)
          .filter(([k, v]) => !/type/.test(k) && v)
          .forEach(([k, v]) => {
            if (v !== assets[k]) {
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
          });
        return true;
      }

      const aggAssets = giveMeAggregatedAssets(assets);
      const aggCheckedAssets = giveMeAggregatedAssets(checkedAssets);
      // check rfid before sending
      if (
        !emptyAssetsCheck(checkedAssets) ||
        !sameAssetsCheck(aggAssets as any, aggCheckedAssets as any) ||
        !assetsCountCheck(aggAssets as any, aggCheckedAssets as any)
      ) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen,
          '',
          '',
          'تعداد یا نوع تجهیزات صحیح نیست !'
        );
        return false;
      }
      try {
        const resp = await rfidCheckMutation({
          variables: {
            workflowNumber,
            processId,
            assets: dropNullValues(checkedAssets),
            checkedAssetsIds,
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
      } catch (e: any) {
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
    async (workflowIds: string[], query: string): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );

      try {
        const resp = await deleteWorkflowsMutation({
          variables: { workflowIds },
          refetchQueries: queryMapper?.[query] ?? [
            {
              query: AllWorkflowsDocument,
              variables: {
                offset,
                limit: itemsPerPage,
              },
            },
            'allWorkflows',
          ],
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
  const approveExitHandler = useCallback(
    async (workflowNumber: string): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );

      try {
        const resp = await approveExitWorkflowQuery({
          variables: { workflowNumber },
          refetchQueries: queryMapper?.allExitWorkflows,
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
    },
    []
  );
  return {
    approveExitHandler,
    allWorkflows: allWorkflowsData?.assetTransferWorkflows ?? [],
    allWorkflowsCount: allWorkflowsData?.assetTransferWorkflowsCount,
    allWorkflowsLoading,
    allWorkflowsError,
    fetchMoreAllWorkflows,
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
    approvedExitWorkflows:
      approvedExitWorkflowsData?.assetTransferWorkflows ?? [],
    approvedExitWorkflowsCount:
      approvedExitWorkflowsData?.assetTransferWorkflowsCount,
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
