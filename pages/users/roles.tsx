import Layout from 'src/Components/Layout';
import Loader from 'src/Components/Loader';
import React from 'react';
import RoleTable from 'src/Components/RolesTable/RolesTable';
import { RolesDocument } from 'lib/graphql-operations';
import Snackbar from 'src/Components/Snackbar';
import { useQuery } from '@apollo/client';
export default function roles() {
  const { loading, error, data } = useQuery(RolesDocument, {fetchPolicy: "cache-and-network"});
  console.log(data);
  
  return (
    <Layout>
      {loading ? <Loader center /> : error ? null : data && <RoleTable />}
      <Snackbar />
    </Layout>
  );
}
