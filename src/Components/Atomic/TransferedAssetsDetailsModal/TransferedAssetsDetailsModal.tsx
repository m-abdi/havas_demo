import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import AggregatedTable from '../AggregatedTable';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditableHtmlTable from '../EditableHtmlTable';
import React from 'react';

export default function TransferedAssetsDetailsModal({
  detailsDialog,
  setDetailsDialog,
  setValue,
  reset,
  register,
  choosedRow,
  aggregated, // use agg table or editable table
}: {
  detailsDialog: boolean;
  setDetailsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: any;
  reset: any;
  register: any;
  choosedRow: any;
  aggregated: boolean;
}) {
  return (
    <Dialog
      sx={{ zIndex: 7000 }}
      open={detailsDialog}
      maxWidth='lg'
      onClose={() => setDetailsDialog(false)}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={'space-between'}
        >
          <span style={{ inlineSize: '10%' }}>
            <IconButton onClick={() => setDetailsDialog(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </span>
          <Typography
            variant='h5'
            component='h2'
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            جزئیات حواله
          </Typography>
          <span style={{ inlineSize: '10%' }}></span>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ position: 'relative', py: 3, px: 1 }}>
        {aggregated ? (
          <AggregatedTable
            selectedColumns={[
              'اکسیژن',
              'گاز بیهوشی',
              'شفت-فلکه',
              'شیر کنترل',
              'Co2',
              'آرگون',
              'ازت',
              'هوای خشک',
              'آنتونکس',
              'استیلن',
              'گاز مایع',
            ]}
            setValue={setValue}
            register={register}
            assets={choosedRow?.passedStages?.[0]?.havaleh?.assets}
            editable={false}
            reset={reset}
          />
        ) : (
          <EditableHtmlTable
            selectedColumns={[
              'اکسیژن',
              'گاز بیهوشی',
              'شفت-فلکه',
              'شیر کنترل',
              'Co2',
              'آرگون',
              'ازت',
              'هوای خشک',
              'آنتونکس',
              'استیلن',
              'گاز مایع',
            ]}
            setValue={setValue}
            register={register}
            assets={choosedRow?.passedStages?.[0]?.havaleh?.assets}
            editable={false}
            reset={reset}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
