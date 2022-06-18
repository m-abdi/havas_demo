import React, { useContext, useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';

import { AllRolesDocument } from 'lib/graphql-operations';
import { InfoContext } from 'pages/_app';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import RoleTable from 'src/Components/RolesTable/RolesTable';
import Snackbar from 'src/Components/Snackbar';
import { useRouter } from 'next/router';

const pageName = 'نقش ها';
export default function roles() {
  // states
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  const router = useRouter();
  // fetch roles from graphql server
  const { loading, error, data, fetchMore } = useQuery(AllRolesDocument, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "cache-and-network",
    variables: {
      take: 13,
      // read existing cursor from apollo cache
      cursor: useApolloClient().readQuery({
        query: AllRolesDocument,
      })?.roles?.[0]?.id,
    },
  });
  console.log(data);
  return (
    <Layout>
      {loading ? (
        <Loader center />
      ) : error ? null : (
        data && (
          <RoleTable
            top='0px'
            fetchMore={fetchMore}
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
