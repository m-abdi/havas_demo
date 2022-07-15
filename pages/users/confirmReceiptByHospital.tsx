import {
  Autocomplete,
  Box,
  Container,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

import { Button } from 'src/Components/Button';
import Head from 'next/head';
import Layout from 'src/Components/Layout';
import NewExitCorporation from 'src/Screens/NewExitCorporation';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'تحویل کپسول به بیمارستان';
export default function ConfirmReceiptByHospital() {
  // states
  const [havaleh, setHavaleh] = useState<{ id: string; label: string }>();
  const [existingWorkflow, setExistingWorkflow] = useState();
  const [editable, setEditable] = useState(false);
  const _ = undefined;
  const { allEnterWorkflows, loading, sending, createNewEnter } = useWorkflows(
    _,
    _,
    _,
    false
  );

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <Container maxWidth='lg' sx={{ position: 'relative' }}>
        {existingWorkflow && (
          <Box sx={{my: 2, mx: 5}}>
            <Stack
              direction='row'
              alignItems={'center'}
              justifyContent='flex-start'
            >
              <Button label='مغایرت' color='error' />
            </Stack>
            <Divider sx={{my: 1}} />
          </Box>
        )}
        {allEnterWorkflows && (
          <Autocomplete
            disablePortal
            id='allHavaleh'
            options={allEnterWorkflows?.enterWorkflows
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
                allEnterWorkflows?.enterWorkflows?.find(
                  (ew) => ew?.passedStages?.[0]?.havaleh?.id === newValue?.id
                )
              );
            }}
            onInputChange={(event, newInput) => {
              if (
                allHavaleh.length > 0 &&
                allHavaleh.some((r) => r.label === newInput)
              ) {
                setHavaleh(
                  allHavaleh?.find((r) => r.label === newInput) as any
                );
                setExistingWorkflow(
                  allEnterWorkflows?.enterWorkflows?.find(
                    (ew) => ew?.passedStages?.[0]?.havaleh?.id === newValue?.id
                  )
                );
              }
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
        )}
        {existingWorkflow && (
          <NewExitCorporation
            loading={loading}
            sending={sending}
            editable={editable}
            createNewHandler={createNewEnter}
            existingWorkflow={existingWorkflow}
          />
        )}
      </Container>
    </Layout>
  );
}
