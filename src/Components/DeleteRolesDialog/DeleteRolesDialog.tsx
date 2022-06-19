import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Button } from '../Button';
import React from 'react';

export default function DeleteRolesDialog({
  open,
  closeDialog,
  confirmDelete,
}: {
  open: boolean;
  closeDialog: () => void;
  confirmDelete: () => Promise<boolean | undefined>;
}) {
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
      <DialogContent>
        <DialogContentText>
          با این کار تمام نقش های انتخاب شده و افراد در آن نقش ها پاک خواهند شد!
        </DialogContentText>
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
