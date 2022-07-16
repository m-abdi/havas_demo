import React, { useEffect, useState } from 'react';

import EnterWarehouseRFID from '../../src/Screens/EnterWarehouseRFID';
import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import { UpdateAssetsStatesDocument } from 'lib/graphql-operations';
import { getQueryDefinition } from '@apollo/client/utilities';
import useMQTT from '../../src/Logic/useMQTT';
import { useMutation } from '@apollo/client';
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
  const { mqttMessage, mqttStatus } = useMQTT();
  const [checkedAssetsIds, setCheckedAssetsIds] = useState([]);
  const { getTagDataQuery, tagData, tagDataLoading } = useTags();

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

  const [updateAssetsStatesMutation, { data }] = useMutation(
    UpdateAssetsStatesDocument
  );
  const updateAssetsState = async (status: string) => {
    await updateAssetsStatesMutation({
      variables: { ids: checkedAssetsIds, status },
    });
  };

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <EnterWarehouseRFID
        loading={false}
        assets={checkedAssets}
        checkedAssets={checkedAssets}
        submitHandler={updateAssetsState}
      />
    </Layout>
  );
}
