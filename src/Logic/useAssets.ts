import {
  AllPersonsDocument,
  AssetsDocument,
  CreateNewPersonDocument,
  DeleteAssetsDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
} from 'lib/graphql-operations';
import {
  AssetFilter,
  EquipmentFilter,
  PersonFilter,
} from 'lib/resolvers-types';
import { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from 'pages/_app';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

export default function useAssets(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: AssetFilter,
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
  } = useQuery(AssetsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters,
    },
  });
  // new person mutation to server
  const [
    createAssetMutation,
    { data: createdPerson, loading: sending, error: creationError },
  ] = useMutation(CreateNewPersonDocument);
  // delete
  const [deleteAssetMutation, { loading: deleting }] =
    useMutation(DeleteAssetsDocument);
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
      id: string,
      firstNameAndLastName: string,
      placeId: string,
      roleId: string,
      state: string,
      city: string,
      postalCode: string,
      address: string,
      telephone: string,
      mobileNumber: string,
      website: string,
      edit: string
    ) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const createdPerson = await createAssetMutation({
          variables: {
            id,
            firstNameAndLastName,
            placeId,
            roleId,
            state,
            city,
            postalCode,
            address,
            telephone,
            mobileNumber,
            website,
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
          router.push('/users/persons');
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
    async (assetIds: string[]): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await deleteAssetMutation({
          variables: {  assetIds },
          refetchQueries: [{ query: AssetsDocument }, 'assets'],
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
