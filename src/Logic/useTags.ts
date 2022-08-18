import {
  AllPersonsDocument,
  AssetsDocument,
  CreateAssetDocument,
  CreateNewPersonDocument,
  CreateTagsDocument,
  DeleteAssetsDocument,
  DeleteEquipmentsDocument,
  DeletePersonsDocument,
  EquipmentsDocument,
  GetTagDataDocument,
} from '../../lib/graphql-operations';
import {
  AssetFilter,
  EquipmentFilter,
  NewTag,
  PersonFilter,
} from '../../lib/resolvers-types';
import { useCallback, useContext } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { SnackbarContext } from '../../pages/_app';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

export default function useTags(
  redirect=true,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: AssetFilter,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>,
  setOffset?: React.Dispatch<React.SetStateAction<number>>
) {
  const router = useRouter();
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // fetch a specific tag
  const [
    getTagDataQuery,
    { data: tagData, error: tagDataError, loading: tagDataLoading, fetchMore: fetchMoreRows },
  ] = useLazyQuery(GetTagDataDocument, {
    fetchPolicy: 'cache-and-network',
  });
  // new tag mutation to server
  const [createTagMutation, { loading: sending }] =
    useMutation(CreateTagsDocument);
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
  const createNew = useCallback(async (tags: NewTag[]) => {
    useNotification(
      'sending',
      setSnackbarColor,
      setSnackbarMessage,
      setSnackbarOpen
    );
    try {
      const createdTag = await createTagMutation({
        variables: {
          tags,
        },
      });
      if (createdTag?.data) {
        useNotification(
          'success',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen
        );
        return true
      } else {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen
        );
        return false
      }
    } catch (e) {
      useNotification(
        'error',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
              return false;

    }
  }, []);

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
    getTagDataQuery,
    tagData,
    tagDataError,
    tagDataLoading,
    fetchMore,
    sending,
    createNew,
    deleting,
    deleteHandler,
  };
}
