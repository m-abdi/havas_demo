import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Button } from '../Button';
import React from 'react';

export default function DeleteDialog({
  title = 'آیا مطمئن هستید؟',
  text = 'با این کار تمام موارد انتخاب شده و اطلاعات مربوط به آنها پاک خواهند شد!',
  open,
  closeDialog,
  confirmDelete,
}: {
  title?: string;
  text?: string;
  open: boolean;
  closeDialog: () => void;
  confirmDelete: () => Promise<void>;
}) {
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          label='بله'
          color='error'
          onClick={confirmDelete}
        />{' '}
        <Button
          label='خیر'
          variant='outlined'
          color='inherit'
          onClick={closeDialog}
        />
      </DialogActions>
    </Dialog>
  );
}
