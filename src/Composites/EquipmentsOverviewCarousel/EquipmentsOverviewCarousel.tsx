import { Divider, Skeleton, Stack, Typography } from '@mui/material';

import Carousel from 'react-grid-carousel';
import { Equipment } from 'lib/resolvers-types';
import EquipmentOverview from '../../../src/Components/EquipmentOverview';
import React from 'react';

export default function EquipmentsOverviewCarousel({
  equipments,
  loading,
}: {
  equipments: Equipment[];
  loading: Boolean;
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
      {equipments.length > 0 && (
        <Carousel
          breakpoint={700}
          cols={equipments?.length}
          rows={1}
          gap={30}
          loop
          autoplay={5000}
          containerStyle={{ maxInlineSize: '100%' }}
        >
          {equipments.map((e) => (
            <Carousel.Item key={e?.terminologyCode}>
              <div style={{ marginBlock: '40px' }}>
                <EquipmentOverview equipment={e} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
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
