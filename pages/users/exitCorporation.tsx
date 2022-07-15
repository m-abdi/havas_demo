import {
  AllPersonsOptionsDocument,
  CreateEnterWorkflowDocument,
  GetWorkflowNumberDocument,
} from 'lib/graphql-operations';
import React, { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import ExitCorporation from 'src/Screens/ExitCorporation';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewEquipment from 'src/Screens/NewEquipment/NewEquipment';
import NewPerson from 'src/Screens/NewPerson';
import NewPlace from 'src/Screens/NewPlace';
import Snackbar from 'src/Components/Snackbar';
import usePlaces from 'src/Logic/usePlaces';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'ثبت خروج از شرکت';

export default function exitCorporation() {
  // access to browser url input
  const router = useRouter();
  // use user session context
  const { data: session, status } = useSession();
  //
  // get workflow number from server
  const { data, loading } = useQuery(GetWorkflowNumberDocument);
  const [createEnterWorkflowMutation, { loading: sending }] = useMutation(
    CreateEnterWorkflowDocument
  );
  // handlers
  const createNew = async (
    workflowNumber: string,
    havalehId: string,
    date: string,
    corporationRepresentativeId: string,
    deliverer: string,
    description: string,
    transportationName: string,
    transportationTelephone: string,
    transportationTelephone2: string,
    edit: string,
    assets: {
      oxygen_50l_factory: number;
      bihoshi_50l_factory: number;
      shaft_50l_factory: number;
      controlValve_50l_factory: number;
      co2_50l_factory: number;
      argon_50l_factory: number;
      azete_50l_factory: number;
      dryAir_50l_factory: number;
      entonox_50l_factory: number;
      acetylene_50l_factory: number;
      lpg_50l_factory: number;
      oxygen_50l_customer: number;
      bihoshi_50l_customer: number;
      shaft_50l_customer: number;
      controlValve_50l_customer: number;
      co2_50l_customer: number;
      argon_50l_customer: number;
      azete_50l_customer: number;
      dryAir_50l_customer: number;
      entonox_50l_customer: number;
      acetylene_50l_customer: number;
      lpg_50l_customer: number;
      oxygen_40l_factory: number;
      bihoshi_40l_factory: number;
      shaft_40l_factory: number;
      controlValve_40l_factory: number;
      co2_40l_factory: number;
      argon_40l_factory: number;
      azete_40l_factory: number;
      dryAir_40l_factory: number;
      entonox_40l_factory: number;
      acetylene_40l_factory: number;
      lpg_40l_factory: number;
      oxygen_40l_customer: number;
      bihoshi_40l_customer: number;
      shaft_40l_customer: number;
      controlValve_40l_customer: number;
      co2_40l_customer: number;
      argon_40l_customer: number;
      azete_40l_customer: number;
      dryAir_40l_customer: number;
      entonox_40l_customer: number;
      acetylene_40l_customer: number;
      lpg_40l_customer: number;
    }
  ) => {
    // drop NaN values
    const filteredAssets = Object.fromEntries(
      Object.entries(assets).filter(([key, value]) => value)
    );

    const resp = await createEnterWorkflowMutation({
      variables: {
        workflowNumber,
        havalehId,
        date,
        corporationRepresentativeId,
        transportationName,
        transportationTelephone,
        transportationTelephone2,
        description,
        deliverer,
        edit,
        assets: filteredAssets,
      },
    });
    if (resp.data) {
      console.log(true);
    } else {
      console.log(false);
    }
  };
  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <ExitCorporation
        loading={loading || status === 'loading'}
        sending={sending}
        createNewHandler={createNew}
        workflowNumber={data?.getWorkflowNumber as string}
        corporationRepresentative={{
          id: session?.user?.id as string,
          label: session?.user?.firstNameAndLastName as string,
        }}
      />
    </Layout>
  );
}
