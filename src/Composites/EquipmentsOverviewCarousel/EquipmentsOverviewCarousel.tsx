import { Divider, Stack, Typography } from '@mui/material';

import Carousel from 'react-grid-carousel';
import { Equipment } from 'lib/resolvers-types';
import EquipmentOverview from '../../../src/Components/EquipmentOverview';
import React from 'react';

export default function EquipmentsOverviewCarousel({
  equipments,
}: {
  equipments: Equipment[];
}) {
  return (
    <Stack
      alignItems={'start'}
      justifyContent='space-between'
      spacing={2}
      sx={{ inlineSize: '100%' }}
    >
      <Typography component='h2' variant='h4'>
        موجودی تجهیزات
      </Typography>
      <Divider variant='fullWidth' flexItem />
      <Carousel
        breakpoint={700}
        cols={equipments.length}
        gap={30}
        loop
        autoplay={5000}
      >
        {equipments?.map((e) => (
          <Carousel.Item>
            <div style={{ marginBlock: '40px' }}>
              <EquipmentOverview key={e?.terminologyCode} equipment={e} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Stack>
  );
}
