import {
  Autocomplete,
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { Button } from '../../src/Components/Atomic/Button';
import Head from 'next/head';
import Layout from '../../src/Components/Atomic/Layout';
import NewExitCorporation from '../../src/Components/Pages/NewExitCorporation';
import NewExitHospital from '../../src/Components/Pages/NewExitHospital';
import usePlaces from '../../src/Logic/usePlaces';
import { useRouter } from 'next/router';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'تحویل کپسول به بیمارستان';
export default function confirmReceiptByCorporation() {
  // states
  const [havaleh, setHavaleh] = useState<{ id: string; label: string }>();
  const [existingWorkflow, setExistingWorkflow] = useState<any>();
  const [editable, setEditable] = useState(false);
  const router = useRouter();
  // data hooks
  const { placesList, placesListLoading } = usePlaces(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    true
  );

  const {
    sentExitWorkflows,
    sentExitWorkflowsLoading,
    confirmReceiptByCorporationSending: sending,
    confirmExitHandler,
  } = useWorkflows(
    0,
    undefined,
    2000000,
    undefined,
    undefined,
    undefined,
    false,
    false,
    false,
    false,
    true
  );
  //
  useEffect(() => {
    if (router?.query?.workflow) {
      setExistingWorkflow(JSON.parse(router?.query?.workflow as string));
    }
  }, [router.isReady]);
  return (
    <Layout pageName={pageName}>
      <Container maxWidth='lg' sx={{ position: 'relative' }}>
        <Box sx={{ my: 2, mx: 5 }}>
          <Stack
            direction='row'
            alignItems={'center'}
            justifyContent='flex-start'
            spacing={2}
          >
            {existingWorkflow && (
              <Button
                label='مغایرت'
                color='error'
                onClick={() => setEditable(true)}
              />
            )}
            {/* <Button
              label='حواله در سامانه موجود نیست'
              backgroundColor='purple'
              onClick={() => router.push('/users/newExitCorporation')}
            /> */}
          </Stack>
          <Divider sx={{ my: 1 }} />
        </Box>

        {sentExitWorkflows ? (
          <Autocomplete
            disablePortal
            id='allHavaleh'
            options={sentExitWorkflows
              ?.map((ew) => ew?.passedStages?.[0]?.havaleh)
              ?.map((h) => ({ id: h?.id, label: h?.id }))}
            // defaultValue={
            //   existingPerson?.role
            //     ? roles.find((p) => p?.id === existingPerson?.role?.id)
            //     : null
            // }
            value={havaleh}
            onChange={(event, newValue) => {
              setHavaleh(newValue as any);
              setExistingWorkflow(
                sentExitWorkflows.find(
                  (ew) =>
                    ew?.passedStages?.[0]?.havaleh?.id === (newValue?.id as any)
                )
              );
            }}
            sx={{ px: 5 }}
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
          sentExitWorkflowsLoading && (
            <Skeleton
              variant='rectangular'
              width={500}
              height={40}
              sx={{ borderRadius: '5px' }}
            />
          )
        )}
        {existingWorkflow && (
          <NewExitHospital
            loading={sentExitWorkflowsLoading}
            sending={sending}
            editable={editable}
            confirmExitHandler={confirmExitHandler}
            existingWorkflow={existingWorkflow}
            corporations={placesList as any}
            corporationsLoading={placesListLoading}
          />
        )}
      </Container>
    </Layout>
  );
}
