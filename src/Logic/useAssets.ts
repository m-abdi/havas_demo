import {
  AllPersonsDocument,
  AssetsDocument,
  AssetsListDocument,
  CreateAssetDocument,
  CreateNewPersonDocument,
  DeleteAssetsDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
  UpdateAssetsStatesDocument,
} from '../../lib/graphql-operations';
import {
  AssetFilter,
  EquipmentFilter,
  PersonFilter,
} from '../../lib/resolvers-types';
import { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from '../../pages/_app';
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
  // assets list for autocomplete fields
  const {
    data: assetsList,
    error: assetsListError,
    loading: assetsListLoading,
  } = useQuery(AssetsListDocument, {
    fetchPolicy: 'cache-and-network',
  });
  // fetch All assets
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
  // new asset mutation to server
  const [createAssetMutation, { loading: sending }] =
    useMutation(CreateAssetDocument);
  // state update mutation
  const [updateAssetsStatesMutation] = useMutation(UpdateAssetsStatesDocument);
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
    async (equipmentId: string, placeId: string, count: number = 1,  edit: string) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      
      try {
        const createdAsset = await createAssetMutation({
          variables: {
            equipmentId,
            placeId,
            count,
            edit,
          },
        });
        if (createdAsset) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          router.push('/users/assets');
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
  // update state handler
  const updateStateHandler = async (status: string, ids?: string[]) => {
    useNotification(
      'sending',
      setSnackbarColor,
      setSnackbarMessage,
      setSnackbarOpen
    );
    try {
      const updatedAssetsCount = await updateAssetsStatesMutation({
        variables: { ids, status },
      });
      if (updatedAssetsCount.data) {
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
  };
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
          variables: { assetIds },
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
    assetsList: assetsList?.assets,
    assetsListLoading,
    assetsListError,
    data,
    error,
    loading,
    fetchMore,
    sending,
    createNew,
    deleting,
    deleteHandler,
    updateStateHandler,
  };
}
