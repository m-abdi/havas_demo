import { Autocomplete, Skeleton, Stack, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { EquipmentsAndPlacesDocument } from '../../lib/graphql-operations';
import ExitWarehouseRFID from '../../src/Screens/ExitWarehouseRFID';
import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import { UpdateAssetsStatesDocument } from '../../lib/graphql-operations';
import { getQueryDefinition } from '@apollo/client/utilities';
import useAssets from '../../src/Logic/useAssets';
import useMQTT from '../../src/Logic/useMQTT';
import { useRouter } from 'next/router';
import useTags from '../../src/Logic/useTags';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'ثبت خروج کپسول توسط RFID';
export default function exitWarehouseRFID() {
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
  const [havaleh, setHavaleh] = useState();
  const [existingWorkflow, setExistingWorkflow] = useState<any>();

  const [checkedAssetsIds, setCheckedAssetsIds] = useState([]);
  //   data hooks
  const {
    allApprovedExitWorkflows,
    approvedExitWorkflowsLoading,
    rfidHandler,
  } = useWorkflows(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    false,
    false,
    true
  );
  const { mqttMessage, mqttStatus } = useMQTT();

  const {
    getTagDataQuery,
    createNew: createTagHandler,
    sending: newTagSending,
    tagData,
    tagDataLoading,
  } = useTags();
  const { updateStateHandler } = useAssets();
  // graphql operations for getting equipments and places
  const { data, loading } = useQuery(EquipmentsAndPlacesDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const router = useRouter();
  // rfid operation
  useEffect(() => {
    (async () => {
      //   fetch tag data
      const { data } = await getTagDataQuery({
        variables: { tagId: mqttMessage },
      });
      //
      const checkedAssetsNames = Object.keys(checkedAssets);
      const terminologyCode = data?.tagData?.asset?.equipment?.terminologyCode;

      // checking to see  if equipment id exists in the table
      if (checkedAssetsNames?.includes(terminologyCode)) {
        setCheckedAssetsIds([...checkedAssetsIds, data?.tagData?.asset?.id]);
        setCheckedAssets({
          ...checkedAssets,
          [terminologyCode]: !checkedAssets[terminologyCode]
            ? 1
            : checkedAssets[terminologyCode] + 1,
        });
      }
    })();
  }, [mqttMessage]);
  // if editing => extract existing workflow data from query param
  const existingWorkflowQuery = useMemo(
    () =>
      router?.query?.workflow
        ? JSON.parse(router?.query?.workflow as string)
        : false,
    [router?.isReady]
  );

  return (
    <Layout pageName={pageName}>
      <Stack
        direction='column'
        alignItems={'center'}
        justifyContent='space-around'
      >
        {allApprovedExitWorkflows ? (
          <Autocomplete
            disablePortal
            id='allConfirmedHavaleh'
            options={allApprovedExitWorkflows
              ?.map((ew) => ew?.passedStages?.[0]?.havaleh)
              ?.map((h) => ({ id: h?.id, label: h?.id }))}
            value={havaleh}
            onChange={(event, newValue) => {
              setHavaleh(newValue as any);
              setExistingWorkflow(
                allApprovedExitWorkflows?.find(
                  (ew) =>
                    ew?.passedStages?.[0]?.havaleh?.id === (newValue?.id as any)
                )
              );
            }}
            sx={{ px: 5, inlineSize: { xs: 300, sm: 400, md: 600 } }}
            noOptionsText={'هیچ حواله خروجی تایید شده ای وجود ندارد'}
            renderInput={(params) => (
              <TextField
                {...params}
                label='جستجوی حواله'
                size='small'
                // error={roleError}
                // helperText={roleError && 'لطفا این فیلد را پر کنید'}
              />
            )}
          />
        ) : (
          approvedExitWorkflowsLoading && (
            <Skeleton
              variant='rectangular'
              width={500}
              height={40}
              sx={{ borderRadius: '5px' }}
            />
          )
        )}
        {(existingWorkflowQuery || existingWorkflow) && (
          <ExitWarehouseRFID
            mqttMessage={mqttMessage as any}
            mqttStatus={mqttStatus}
            equipmentsLoading={loading}
            placesLoading={loading}
            newTagSending={newTagSending}
            equipments={data?.equipments as any}
            places={data?.places as any}
            assets={
              existingWorkflowQuery
                ? existingWorkflowQuery?.passedStages?.[1]?.havaleh?.assets ??
                  existingWorkflowQuery?.passedStages?.[0]?.havaleh?.assets
                : existingWorkflow &&
                  (existingWorkflow?.passedStages?.[1]?.havaleh?.assets ??
                    existingWorkflow?.passedStages?.[0]?.havaleh?.assets)
            }
            checkedAssets={checkedAssets as any}
            submitHandler={async (status: string) => {
              const params = existingWorkflowQuery
                ? [
                    existingWorkflowQuery?.workflowNumber,
                    existingWorkflowQuery?.instanceOfProcessId,
                    checkedAssets,
                  ]
                : existingWorkflow && [
                    existingWorkflow?.workflowNumber,
                    existingWorkflow?.instanceOfProcessId,
                    checkedAssets,
                  ];
              const r = await rfidHandler(
                params[0],
                params[1],
                params[2],
                existingWorkflowQuery
                  ? existingWorkflowQuery?.passedStages?.[1]?.havaleh?.assets ??
                      existingWorkflowQuery?.passedStages?.[0]?.havaleh?.assets
                  : existingWorkflow &&
                      (existingWorkflow?.passedStages?.[1]?.havaleh?.assets ??
                        existingWorkflow?.passedStages?.[0]?.havaleh?.assets)
              );
              if (r) {
                await updateStateHandler(status, checkedAssetsIds);
                
              }
            }}
            createTagHandler={createTagHandler}
          />
        )}
      </Stack>
    </Layout>
  );
}
