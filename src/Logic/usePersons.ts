import {
  AllPersonsDocument,
  CreateNewPersonDocument,
  DeletePersonsDocument,
} from '../../lib/graphql-operations';
import { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { PersonFilter } from '../../lib/resolvers-types';
import { SnackbarContext } from 'pages/_app';
import useNotification from './useNotification';
import { useRouter } from 'next/router';

export default function usePersons(
  offset = 0,
  pageNumber?: number,
  itemsPerPage = 10,
  filters?: PersonFilter,
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
  } = useQuery(AllPersonsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset,
      limit: itemsPerPage,
      filters,
    },
  });
  // new person mutation to server
  const [
    createPersonMutation,
    { data: createdPerson, loading: sending, error: creationError },
  ] = useMutation(CreateNewPersonDocument);
  // delete
  const [deletePersonsMutation, { loading: deleting }] = useMutation(
    DeletePersonsDocument
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
        // create new person from rest api
        if (!edit) {
          const resp = await fetch('/api/createPerson', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            }),
          });
          if (resp.ok) {
            useNotification(
              'success',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen
            );
            router.push('/users/persons');
            return;
          } else {
            useNotification(
              'error',
              setSnackbarColor,
              setSnackbarMessage,
              setSnackbarOpen
            );
            return;
          }
        } else {
          const createdPerson = await createPersonMutation({
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
    async (personIds: string[]): Promise<any> => {
      // provide a response for user interaction(sending...)
      useNotification(
        'sending',
        setSnackbarColor,
        setSnackbarMessage,
        setSnackbarOpen
      );
      try {
        const resp = await deletePersonsMutation({
          variables: { personIds },
          refetchQueries: [{ query: AllPersonsDocument }, 'allPersons'],
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
