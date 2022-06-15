import React, { useContext, useEffect } from 'react';

import { InfoContext } from 'pages/_app';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import RoleTable from 'src/Components/RolesTable/RolesTable';
import { RolesDocument } from 'lib/graphql-operations';
import Snackbar from 'src/Components/Snackbar';
import { useQuery } from '@apollo/client';

const pageName = "نقش ها"
export default function roles() {
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  const { loading, error, data } = useQuery(RolesDocument, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Layout>
      {loading ? (
        <Loader center />
      ) : error ? null : (
        data && <RoleTable rows={data?.roles as RoleType[]} />
      )}
      <Snackbar />
    </Layout>
  );
}
