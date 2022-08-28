import { Box } from '@mui/material';
import { Button } from '../../Atomic/Button';
import React from 'react';
import { Session } from 'next-auth';

export default function DeleteButton({
  selectedFlatRows,
  session,
  setDeleteDialog,
}: {
  selectedFlatRows: any;
  session: Session | null;
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 75,
        right: 40,
        zIndex: 40,
      }}
    >
      <Button
        label='حذف'
        size='large'
        color='error'
        variant='contained'
        disabled={
          selectedFlatRows.length === 0 || !session?.user?.role?.deleteLicense
            ? true
            : false
        }
        onClick={() => {
          setDeleteDialog(true);
        }}
      />
    </Box>
  );
}
