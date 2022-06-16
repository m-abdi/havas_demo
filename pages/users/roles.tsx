import React, { useContext, useEffect, useState } from 'react';

import { InfoContext } from 'pages/_app';
import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import RoleTable from 'src/Components/RolesTable/RolesTable';
import { RolesDocument } from 'lib/graphql-operations';
import Snackbar from 'src/Components/Snackbar';
import { useQuery } from '@apollo/client';

const pageName = 'نقش ها';
export default function roles() {
  // states
  const [hasMoreRows, setHasMoreRows] = useState(true);
  const [rolesData, setRolesData] = useState('');
  // page info context
  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  const { loading, error, data, fetchMore } = useQuery(RolesDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { take: 2, cursor: rolesData?.roles?.length > 0 ? rolesData?.roles[rolesData.roles.length - 1]?.id : undefined },
  });
  // put data in rolesData state
  useEffect(() => {
    setRolesData(data);
  }, [data]);
console.log(rolesData);

  return (
    <Layout>
      {loading ? (
        <Loader center />
      ) : error ? null : (
        data && (
          <RoleTable
            top='65px'
            fetchMore={fetchMore}
            hasMoreRows={hasMoreRows}
            setHasMoreRows={setHasMoreRows}
            rows={data?.roles as RoleType[]}
          />
        )
      )}
      <Snackbar />
    </Layout>
  );
}
