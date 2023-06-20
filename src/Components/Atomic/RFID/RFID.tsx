import { Box, Stack, Typography } from '@mui/material';

import React from 'react';

export default function RFID({
  status,
}: {
  status: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';
}) {
  return (
    <Stack
      direction='column'
      alignItems='center'
      spacing={2}
      sx={{ boxShadow: 5, p: 3, borderRadius: 3 }}
    >
      {status === 'CONNECTING' ? (
        <>
          {' '}
          <img
            alt='rfid-loader'
            src='/images/rfid.png'
            width={'250px'}
            height={'150px'}
          />
          <Typography
            component={'h3'}
            variant='h5'
            fontWeight={'bolder'}
            textAlign='center'
          >
            در حال اتصال ...
          </Typography>
        </>
      ) : status === 'CONNECTED' ? (
        <>
          <img
            alt='rfid-loader'
            src='/images/rfid-green.png'
            width={'150px'}
            height={'90px'}
          />
          <Typography
            component={'h3'}
            variant='h5'
            fontWeight={'bolder'}
            textAlign='center'
            color={"success.main"}
          >
            متصل
          </Typography>
        </>
      ) : status === 'DISCONNECTED' ? (
        <img
          alt='rfid-loader'
          src='/images/rfid-red.png'
          width={'250px'}
          height={'150px'}
        />
      ) : null}
    </Stack>
  );
}
