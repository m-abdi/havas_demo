import {
  AllPlacesDocument,
  AllRolesAndPlacesDocument,
  CreateCategoryDocument,
  CreatePlaceDocument,
  CreateRoleDocument,
  DeletePlacesDocument,
  PlacesListDocument,
} from '../../lib/graphql-operations';
import React, { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { PlaceFilter } from '../../lib/resolvers-types';
import { SnackbarContext } from '../../pages/_app';
import useNotification from './useNotification';

export default function useRoles(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: PlaceFilter,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>,
  setOffset?: React.Dispatch<React.SetStateAction<number>>,
  fetchAllPlaces = false,
  fetchPlacesList = false
) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } =
    useContext(SnackbarContext);
  // places list for autocomplete fields
  const [
    placesListQuery,
    { data: placesList, loading: placesListLoading, error: placesListError },
  ] = useLazyQuery(PlacesListDocument, {
    fetchPolicy: 'cache-and-network',
  });
  // fetch query
  const [allPlacesQuery, { data, loading, error, fetchMore: fetchMoreRows }] =
    useLazyQuery(AllPlacesDocument, {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
      variables: {
        offset,
        limit: itemsPerPage,
        filters,
      },
    });
  // fetch queries that are requested
  useEffect(() => {
    (async () => {
      if (fetchAllPlaces) {
        await allPlacesQuery();
      } else if (fetchPlacesList) {
        await placesListQuery();
      }
    })();
  }, [filters]);
  // new role mutation
  const [createRoleMutation, { loading: sending }] =
    useMutation(CreateRoleDocument);
  // new category mutation
  const [
    createCategoryMutation,
    { data: categoryId, loading: sendingCategory },
  ] = useMutation(CreateCategoryDocument);
  // delete place mutation
  const [deletePlacesMutation, { loading: deleting }] =
    useMutation(DeletePlacesDocument);

  // handlers
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
  const createNew = useCallback(
    async (name: string, permissions: any, edit: string) => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await createRoleMutation({
          variables: { name, permissions, edit },
        });
        if (resp.data) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          return resp?.data?.createRole;
        } else if (resp.errors) {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          return false;
        }
      } catch (e: any) {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen
        );
        return false;
      }
      return false;
    },
    []
  );
  const createNewCategory = useCallback(
    async (name: string, superPlaceId: string) => {
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await createCategoryMutation({
          variables: { name, superPlaceId },
          refetchQueries: [
            { query: AllRolesAndPlacesDocument },
            'allRolesAndPlaces',
            { query: AllPlacesDocument },
            'allPlaces',
          ],
        });
        if (resp.data) {
          useNotification(
            'success',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          return resp.data.createCategory;
        } else {
          useNotification(
            'error',
            setSnackbarColor,
            setSnackbarMessage,
            setSnackbarOpen
          );
          return false;
        }
      } catch {
        useNotification(
          'error',
          setSnackbarColor,
          setSnackbarMessage,
          setSnackbarOpen
        );

        return false;
      }
    },
    []
  );
  const deleteHandler = useCallback(
    async (placeIds: string[]): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await deletePlacesMutation({
          variables: { placeIds },
          refetchQueries: [
            { query: AllPlacesDocument },
            'allPlaces',
            { query: AllRolesAndPlacesDocument },
            'allRolesAndPlacesDocument',
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
    },
    []
  );
  return {
    placesList: placesList?.places,
    placesListError,
    placesListLoading,
    sending,
    deleting,
    loading,
    data,
    fetchMore,
    createNew,
    createNewCategory,
    deleteHandler,
  };
}
