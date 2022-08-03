import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import AggregatedTable from '../../Components/AggregatedTable';
import { Button } from '../../Components/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NewTag from '../NewTag/NewTag';
import { NewTag as NewTagType } from '../../../lib/resolvers-types';
import { useForm } from 'react-hook-form';

export default function EnterWarehouseRFID({
  equipmentsLoading,
  placesLoading,
  newTagSending,
  assets,
  checkedAssets = {},
  places,
  equipments,
  mqttMessage,
  mqttStatus,
  submitHandler,
  createTagHandler,
}: {
  equipmentsLoading?: boolean;
  placesLoading?: boolean;
  newTagSending: boolean;
  places?: { id: string; label: string }[];
  equipments?: { id: string; label: string }[];
  mqttMessage: string;
  mqttStatus: any;
  assets: {
    oxygen_50l?: number;
    bihoshi_50l?: number;
    shaft_50l?: number;
    controlValve_50l?: number;
    co2_50l?: number;
    argon_50l?: number;
    azete_50l?: number;
    dryAir_50l?: number;
    entonox_50l?: number;
    acetylene_50l?: number;
    lpg_50l?: number;
    oxygen_40l?: number;
    bihoshi_40l?: number;
    shaft_40l?: number;
    controlValve_40l?: number;
    co2_40l?: number;
    argon_40l?: number;
    azete_40l?: number;
    dryAir_40l?: number;
    entonox_40l?: number;
    acetylene_40l?: number;
    lpg_40l?: number;
  };
  checkedAssets: {
    oxygen_50l?: number;
    bihoshi_50l?: number;
    shaft_50l?: number;
    controlValve_50l?: number;
    co2_50l?: number;
    argon_50l?: number;
    azete_50l?: number;
    dryAir_50l?: number;
    entonox_50l?: number;
    acetylene_50l?: number;
    lpg_50l?: number;
    oxygen_40l?: number;
    bihoshi_40l?: number;
    shaft_40l?: number;
    controlValve_40l?: number;
    co2_40l?: number;
    argon_40l?: number;
    azete_40l?: number;
    dryAir_40l?: number;
    entonox_40l?: number;
    acetylene_40l?: number;
    lpg_40l?: number;
  };
  submitHandler: (status: string) => Promise<void>;
  createTagHandler: (tags: NewTagType[]) => Promise<boolean>;
}) {
  // states
  const [newTagDialogIsOpened, setNewTagDialogIsOpened] = useState(false);
  // react-form-hooks
  const { register:register1, setValue: setValue1 } = useForm();
  const { register: register2,setValue: setValue2 } = useForm();
  return (
    <Container maxWidth='lg' sx={{ position: 'relative' }}>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent='space-between'
        sx={{ my: 3 }}
      >
        <span></span>
        <Button
          label='تگ جدید'
          color='info'
          onClick={() => setNewTagDialogIsOpened(true)}
        />
      </Stack>
      <Stack alignItems={'center'} spacing={3}>
        <Box>
          <Typography
            variant='h4'
            component='h3'
            textAlign={'center'}
            sx={{ mb: 1 }}
          >
            تجهیزات ثبت شده
          </Typography>
          <TableContainer>
            <AggregatedTable
              register={register1}
              setValue={setValue1}
              editable={false}
              assets={assets}
            />
          </TableContainer>
        </Box>
        <Divider flexItem variant='fullWidth' />
        <Box>
          <Typography
            variant='h4'
            component='h3'
            textAlign={'center'}
            sx={{ mb: 1 }}
          >
            تجهیزات خوانده شده
          </Typography>
          <TableContainer>
            <AggregatedTable
              register={register2}
              setValue={setValue2}
              editable={false}
              assets={checkedAssets}
            />
          </TableContainer>
        </Box>
      </Stack>
      <Dialog
        sx={{ zIndex: 7000 }}
        open={newTagDialogIsOpened}
        onClose={() => setNewTagDialogIsOpened(false)}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            display: mqttStatus !== 'CONNECTED' ? 'none' : 'block',
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent={'space-between'}
          >
            <span style={{ inlineSize: '10%' }}>
              <IconButton onClick={() => setNewTagDialogIsOpened(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </span>
            <Typography
              variant='h5'
              component='h2'
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              تگ جدید
            </Typography>
            <span style={{ inlineSize: '10%' }}></span>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', p: '1px' }}>
          <NewTag
            equipmentsLoading={equipmentsLoading}
            placesLoading={placesLoading}
            sending={newTagSending}
            equipments={equipments}
            places={places}
            mqttMessage={mqttMessage}
            mqttStatus={mqttStatus}
            newAsset={true}
            createTagHandler={async (tags: NewTagType[]) => {
          
              
              const resp = await createTagHandler(tags);
              if (resp) {
                setNewTagDialogIsOpened(false);
              }
            }}
          />
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          position: 'absolute',
          top: -110,
          right: '35px',
        }}
      >
        <Button
          id='submitButton'
          label='ارسال'
          size='large'
          color='success'
          variant='contained'
          onClick={async () => await submitHandler('موجود در بیمارستان')}
        />
      </Box>
    </Container>
  );
}
