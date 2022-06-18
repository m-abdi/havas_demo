import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';

import { AllRolesDocument } from 'lib/graphql-operations';
import { InfoContext } from 'pages/_app';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import RoleTable from 'src/Components/RolesTable/RolesTable';
import Snackbar from 'src/Components/Snackbar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'نقش ها';
export default function roles() {
  // stats
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //
  const { data: session } = useSession();
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  const router = useRouter();
  // fetch roles from graphql server
  const { loading, error, data, fetchMore } = useQuery(AllRolesDocument, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      limit: itemsPerPage,
      offset: 0,
    },
  });
  const fetchMoreRows = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
      fetchMore({
        variables: { offset: itemsPerPage * page, limit: itemsPerPage },
      });
    },
    [itemsPerPage]
  );

  return (
    <Layout>
      {loading ? (
        <Loader center />
      ) : error ? null : (
        data && (
          <RoleTable
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            fetchMoreRows={fetchMoreRows}
            session={session}
            loading={loading}
            router={router}
            hasNextRole={data?.hasNextRole}
            rows={data?.roles as RoleType[]}
          />
        )
      )}
      <Snackbar />
    </Layout>
  );
}
