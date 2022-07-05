import {
  AllPersonsDocument,
  CreateEquipmentDocument,
  CreateNewPersonDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
} from 'lib/graphql-operations';
import { EquipmentFilter, PersonFilter } from 'lib/resolvers-types';
import { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from 'pages/_app';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

export default function useEquipments(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: EquipmentFilter,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>,
  setOffset?: React.Dispatch<React.SetStateAction<number>>
) {
  const router = useRouter();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // fetch All persons
  const {
    data,
    error,
    loading,
    fetchMore: fetchMoreRows,
  } = useQuery(EquipmentsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters,
    },
  });
  // new person mutation to server
  const [createEquipmentMutation, { loading: sending }] = useMutation(
    CreateEquipmentDocument
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
  const createNew = useCallback(
    async (
      name: string,
      model: string,
      factoryId: string,
      serialNumber: string,
      productionYear: string,
      installationYear: string,
      terminologyCode: string,
      hasInstructions: boolean,
      supportCompany: string,
      supportTelephone1: string,
      supportTelephone2: string,
      edit: string
    ) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const createdPerson = await createEquipmentMutation({
          variables: {
            name,
            model,
            factoryId,
            serialNumber,
            productionYear,
            installationYear,
            terminologyCode,
            hasInstructions,
            supportCompany,
            supportTelephone1,
            supportTelephone2,
            edit,
          },
        });
        if (createdPerson) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          router.push('/users/equipments');
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
    data,
    error,
    loading,
    fetchMore,
    sending,
    createNew,
    deleting,
    deleteHandler,
  };
}
