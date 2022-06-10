import Box from '@mui/material/Box';
import { HalfMalf } from 'react-spinner-animated';
import React from 'react';

export default function LoaderSpinner({ center }: { center: boolean }) {
  return (
    <Box sx={{ color: '#365d8c' }}>
      <HalfMalf width="150px" height="150px" center={center} />
    </Box>
  );
}
