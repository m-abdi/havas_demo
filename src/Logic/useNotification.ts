import React, { useContext } from 'react';

import { SnackbarContext } from 'pages/_app';

export default function useNotification(
  type: 'sending' | 'success' | 'error' | 'newTag',
  setSnackbarColor: any,
  setSnackbarMessage: any,
  setSnackbarOpen: any,
  sendingMessage = 'در حال ارسال',
  successMessage = 'انجام شد',
  errorMessage = 'خطا',
  tagMessage = 'تگ جدید'
) {
  if (type === 'sending') {
    setSnackbarColor('info');
    setSnackbarMessage(sendingMessage);
    setSnackbarOpen(true);
  } else if (type === 'success') {
    setSnackbarColor('success');
    setSnackbarMessage(successMessage);
    setSnackbarOpen(true);
  } else if (type === 'error') {
    setSnackbarColor('error');
    setSnackbarMessage(errorMessage);
    setSnackbarOpen(true);
  } else if (type === 'newTag') {
    setSnackbarColor('info');
    setSnackbarMessage(tagMessage);
    setSnackbarOpen(true);
  }
}
