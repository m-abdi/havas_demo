import {
  AllPersonsDocument,
  DeleteRolesDocument,
  RolesDocument,
} from 'lib/graphql-operations';
import { Box, Container } from '@mui/material';
import { InfoContext, SnackbarContext } from 'pages/_app';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';

import AuthenticationRequired from 'src/AuthenticationRequired';
import { Button } from '../../src/Components/Atomic/Button';
import DeleteDialog from '../../src/Components/Atomic/DeleteRolesDialog';
import Head from 'next/head';
import Layout from '../../src/Components/Atomic/Layout';
import Loader from '../../src/Components/Atomic/Loader';
import RolesTable from '../../src/Components/Atomic/RolesTable/RolesTable';
import Snackbar from '@mui/material';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'نقش ها';
export default function roles() {
  // stats
  const [pageNumber, setPageNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [checkedItems, setCheckedItems] = useState(
    {} as { [key: string]: boolean }
  );
  const [loading, setLoading] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [deleteRoleDialog, setDeleteRoleDialog] = useState(false);
  //
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    snackbarColor,
    setSnackbarColor,
  } = useContext(SnackbarContext);
  const { data: session } = useSession();

  const router = useRouter();
  // fetch roles from graphql server
  const {
    loading: rolesDataLoading,
    error,
    data,
    fetchMore,
  } = useQuery(RolesDocument, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      limit: itemsPerPage,
      offset,
    },
  });
  // deleteRoles Mutation
  const [deleteRolesMutation, { loading: deletingRolesLoading }] =
    useMutation(DeleteRolesDocument);
  // handlers
  const deleteRoles = useCallback(async (): Promise<any> => {
    const roleIds = Object.keys(checkedItems).filter((k) => checkedItems[k]);

    // provide a response for user interaction(sending...)
    setLoading(true);
    setSnackbarColor('info');
    setSnackbarMessage('در حال ارسال');
    setSnackbarOpen(true);
    try {
      const resp = await deleteRolesMutation({
        variables: { roleIds },
        refetchQueries: [
          { query: RolesDocument },
          'roles',
          { query: AllPersonsDocument },
          'allPersons',
        ],
      });
      if (resp.data?.deleteRoles) {
        setSnackbarColor('success');
        setSnackbarMessage('انجام شد');
        setSnackbarOpen(true);
      } else if (resp?.errors) {
        setSnackbarColor('error');
        setSnackbarMessage('خطا');
        setSnackbarOpen(true);
      }
    } catch (e) {
      setSnackbarColor('error');
      setSnackbarMessage('خطا');
      setSnackbarOpen(true);
    }
    setOffset(0);
    setPageNumber(0);
    setLoading(false);
    setDeleteRoleDialog(false);
  }, [checkedItems]);

  const fetchMoreRows = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {

      fetchMore({
        variables: { offset: itemsPerPage * page, limit: itemsPerPage },
      });
      setPageNumber(page);
      setOffset(itemsPerPage * page);
    },
    [itemsPerPage, pageNumber]
  );

  return (
    <Layout pageName={pageName}>
      <RolesTable
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        fetchMoreRows={fetchMoreRows}
        session={session}
        loading={rolesDataLoading}
        router={router}
        pageNumber={pageNumber}
        hasNextRole={data?.hasNextRole as boolean}
        rows={data?.roles as RoleType[]}
        allRolesCount={data?.countAllRoles as number}
        checkedAll={checkedAll}
        setCheckedAll={setCheckedAll}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        setDeleteDialog={setDeleteRoleDialog}

        // checkedAllPages={
        //   router?.query?.checkedAllPages
        //     ? JSON.parse(router?.query?.checkedAllPages)
        //     : []
        // }
      />

      <DeleteDialog
        text='با این کار تمام نقش های انتخاب شده و افراد در آن نقش ها پاک خواهند شد!'
        open={deleteRoleDialog}
        closeDialog={() => setDeleteRoleDialog(false)}
        confirmDelete={deleteRoles}
      />
    </Layout>
  );
}
