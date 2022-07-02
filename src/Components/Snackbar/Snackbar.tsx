import { Alert, Snackbar as MuiSnackbar, useMediaQuery } from '@mui/material';
import React, { useContext, useState } from 'react';

import { SnackbarContext } from '../../../pages/_app';

export default function Snackbar(props: any) {
  const smallScreensMatch = useMediaQuery((theme: any) =>
    theme?.breakpoints.up('sm')
  );
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    snackbarColor,
    setSnackbarColor,
  } = useContext(SnackbarContext);

  return (
    <MuiSnackbar
      id='notification'
      open={snackbarOpen}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      sx={{
        zIndex: 10000,
      }}
    >
      <Alert
        severity={snackbarColor}
        variant='filled'
        sx={{
          fontWeight: 'bold',
          fontSize: '1.2rem',
          alignItems: 'center',
        }}
      >
        {snackbarMessage}
      </Alert>
    </MuiSnackbar>
  );
}
