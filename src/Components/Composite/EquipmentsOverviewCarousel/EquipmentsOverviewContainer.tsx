import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';

import Carousel from 'carousel-react-rcdev';
// import Carousel from 'react-grid-carousel';
import { Equipment } from 'lib/resolvers-types';
import EquipmentOverview from '../../Atomic/EquipmentOverview';
import React from 'react';

export default function EquipmentsOverviewContainer({
  equipments,
  loading,
}: {
  equipments: Equipment[];
  loading: Boolean;
}) {
  return (
    <Stack
      component={'article'}
      alignItems={'start'}
      justifyContent='space-between'
      spacing={2}
      sx={{ inlineSize: '100%' }}
    >
      <Typography component='h2' variant='h4'>
        موجودی تجهیزات
      </Typography>
      <Divider variant='fullWidth' flexItem />
      {equipments.length > 0 && (
        <Stack
          direction={'row'}
          flexWrap={'wrap'}
          alignItems='center'
          justifyContent={'center'}
          sx={{ overflow: 'auto', inlineSize: "100%" }}
        >
          {equipments.map((e) => (
            <div style={{ margin: '30px', direction: 'rtl' }}>
              <EquipmentOverview equipment={e} />
            </div>
          ))}
        </Stack>
      )}
      {(!equipments || equipments?.length === 0) && loading && (
        <Stack
          direction={'row'}
          alignItems='center'
          justifyContent={'start'}
          spacing={3}
        >
          {[1, 2, 3].map((e) => (
            <Skeleton
              variant='rectangular'
              width={300}
              height={250}
              sx={{ borderRadius: 3, boxShadow: 5 }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}