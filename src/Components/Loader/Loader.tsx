import { Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import { HalfMalf } from 'react-spinner-animated';
import React from 'react';

export default function LoaderSpinner({
  center,
  withText = false,
}: {
  center: boolean;
  withText?: boolean;
}) {
  return (
    <Stack alignItems='center'>
      <Box sx={{ color: '#365d8c' }}>
        <HalfMalf width='150px' height='150px' center={center} />
      </Box>
    </Stack>
  );
}
