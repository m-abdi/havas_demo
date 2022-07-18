import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import EnterWarehouseRFID from '../../src/Screens/EnterWarehouseRFID';
import { EquipmentsAndPlacesDocument } from '../../lib/graphql-operations';
import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import { UpdateAssetsStatesDocument } from 'lib/graphql-operations';
import { getQueryDefinition } from '@apollo/client/utilities';
import useAssets from '../../src/Logic/useAssets';
import useMQTT from '../../src/Logic/useMQTT';
import useTags from '../../src/Logic/useTags';

const pageName = 'RFID ثبت ورود کپسول به انبار توسط';
export default function enterWarehouseRFID() {
  //
  const [checkedAssets, setCheckedAssets] = useState({
    oxygen_50l: null,
    bihoshi_50l: null,
    shaft_50l: null,
    controlValve_50l: null,
    co2_50l: null,
    argon_50l: null,
    azete_50l: null,
    dryAir_50l: null,
    entonox_50l: null,
    acetylene_50l: null,
    lpg_50l: null,
    oxygen_40l: null,
    bihoshi_40l: null,
    shaft_40l: null,
    controlValve_40l: null,
    co2_40l: null,
    argon_40l: null,
    azete_40l: null,
    dryAir_40l: null,
    entonox_40l: null,
    acetylene_40l: null,
    lpg_40l: null,
  });
  //   states
  const { mqttMessage, mqttStatus } = useMQTT();
  const [checkedAssetsIds, setCheckedAssetsIds] = useState([]);
  //   data hooks
  const {
    getTagDataQuery,
    createNew: createTagHandler,
    sending: newTagSending,
    tagData,
    tagDataLoading,
  } = useTags();
  const { updateStateHandler } = useAssets();
  // graphql operations for getting equipments and places
  const { data, loading } = useQuery(EquipmentsAndPlacesDocument);
  // rfid operation
  useEffect(() => {
    const updateCheckedAssets = () => {
      //   fetch tag data
      getTagDataQuery({ variables: { tagId: mqttMessage } });
      //
      const checkedAssetsNames = Object.keys(checkedAssets);
      const terminologyCode =
        tagData?.tagData?.asset?.equipment?.terminologyCode;

      // checking to see  if equipment id exists in the table
      if (checkedAssetsNames?.includes(terminologyCode)) {
        setCheckedAssetsIds([...checkedAssetsIds, tagData?.tagData?.asset?.id]);
        setCheckedAssets({
          ...checkedAssets,
          [terminologyCode]: !checkedAssets[terminologyCode]
            ? 1
            : checkedAssets[terminologyCode] + 1,
        });
      }
    };
    updateCheckedAssets();
  }, [mqttMessage, tagData]);

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <EnterWarehouseRFID
        mqttMessage={mqttMessage}
        mqttStatus={mqttStatus}
        equipmentsLoading={loading}
        placesLoading={loading}
        newTagSending={newTagSending}
        equipments={data?.equipments as any}
        places={data?.places}
        assets={checkedAssets}
        checkedAssets={checkedAssets}
        submitHandler={async (status: string) => {
          await updateStateHandler(status, checkedAssetsIds);
        }}
        createTagHandler={createTagHandler}
      />
    </Layout>
  );
}
