import {
  Box,
  Container,
  Divider,
  Stack,
  TableContainer,
  Typography,
} from '@mui/material';

import AggregatedTable from '../../Components/AggregatedTable';
import React from 'react';
import { useForm } from 'react-hook-form';
import useWorkflows from '../../Logic/useWorkflows';

export default function EnterWarehouseRFID({
  loading,
  assets,
  checkedAssets = {},
}: {
  loading: boolean;
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
}) {
  // react-form-hooks
  const { register, setValue } = useForm();
  return (
    <Container maxWidth='lg' sx={{ position: 'relative' }}>
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
            <AggregatedTable editable={false} assets={assets} />
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
              register={register}
              setValue={setValue}
              editable={false}
              assets={checkedAssets}
            />
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
}
