import {
  Autocomplete,
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

import { Button } from '../../src/Components/Button';
import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import NewExitCorporation from '../../src/Screens/NewExitCorporation';
import NewExitHospital from '../../src/Screens/NewExitHospital';
import { useRouter } from 'next/router';
import useWorkflows from '../../src/Logic/useWorkflows';

const pageName = 'تحویل کپسول به بیمارستان';
export default function confirmReceiptByCorporation() {
  // states
  const [havaleh, setHavaleh] = useState<{ id: string; label: string }>();
  const [existingWorkflow, setExistingWorkflow] = useState();
  const [editable, setEditable] = useState(false);

  const _ = undefined;
  const {
    allExitWorkflows,
    allExitWorkflowsLoading,
    sending,
    confirmEnterHandler,
  } = useWorkflows(
    0,
    undefined,
    2000000,
    null,
    undefined,
    undefined,
    false,
    false,
    true
  );
  //

  const router = useRouter();
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
            <Button
              label='حواله در سامانه موجود نیست'
              backgroundColor='purple'
              onClick={() => router.push('/users/newExitCorporation')}
            />
          </Stack>
          <Divider sx={{ my: 1 }} />
        </Box>

        {allExitWorkflows ? (
          <Autocomplete
            disablePortal
            id='allHavaleh'
            options={allExitWorkflows
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
                allExitWorkflows.find(
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
          allExitWorkflowsLoading && (
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
            loading={allExitWorkflowsLoading}
            sending={sending}
            editable={editable}
            confirmEnterHandler={confirmEnterHandler}
            existingWorkflow={existingWorkflow}
          />
        )}
      </Container>
    </Layout>
  );
}
