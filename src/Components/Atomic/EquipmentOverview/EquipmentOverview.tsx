import { Paper, Stack, Typography } from '@mui/material';

import { Equipment } from 'lib/resolvers-types';
import React from 'react';
import { toPersianDigit } from '../../../Logic/toPersianDigit';

export default function EquipmentOverview({
  equipment,
  picture = '/images/gas-cylinder.png',
}: {
  equipment: Equipment;
  picture?: string;
}) {
  return (
    <Paper
      sx={{
        inlineSize: {xs: 250, md:280},
        blockSize: 250,
        borderRadius: 3,
        boxShadow: 5,
        p: 1,
        "& h6": {
          direction: "rtl"
        }
      }}
    >
      <Stack
        alignItems='center'
        justifyContent={'space-between'}
        spacing={1}
        sx={{ blockSize: '100%' }}
      >
        {/* title and picture */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={'space-between'}
          spacing={1}
          sx={{ flexGrow: 1, inlineSize: '100%' }}
        >
          <Typography component={'h3'} variant='h5' fontWeight={'bold'}>
            {equipment?.name}
          </Typography>
          <img
            src={picture}
            width='150px'
            style={{
              objectFit: 'contain',
              transform: 'rotate(15deg)',
              marginBlockStart: '-50px',
            }}
          />
        </Stack>
        {/* overview data */}
        <article
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            gridTemplateColumns: '1fr 1fr',
            inlineSize: '100%',
          }}
        >
          <Stack
            alignItems={'center'}
            justifyContent='center'
            sx={{ borderBottom: 1, borderRight: 1, p: 0.3 }}
          >
            <Typography component={'h6'} variant='body1'>
              {toPersianDigit(
                (equipment.available?.toString() as string) ?? '0'
              )}
            </Typography>
            <Typography component={'h6'} variant='body2'>
              موجود در بیمارستان
            </Typography>
          </Stack>
          <Stack
            alignItems={'center'}
            justifyContent='center'
            sx={{ borderBottom: 1, borderLeft: 1, p: 0.3 }}
          >
            <Typography component={'h6'} variant='body1'>
              {toPersianDigit(
                (equipment.outsourced?.toString() as string) ?? '0'
              )}
            </Typography>
            <Typography component={'h6'} variant='body2'>
              برون سپاری شده
            </Typography>
          </Stack>
          <Stack
            alignItems={'center'}
            justifyContent='center'
            sx={{ borderTop: 1, borderRight: 1, p: 0.3 }}
          >
            <Typography component={'h6'} variant='body1'>
              {toPersianDigit(
                (equipment.receiving?.toString() as string) ?? '0'
              )}
            </Typography>
            <Typography component={'h6'} variant='body2'>
              در حال دریافت
            </Typography>
          </Stack>
          <Stack
            alignItems={'center'}
            justifyContent='center'
            sx={{ borderTop: 1, borderLeft: 1, p: 0.3 }}
          >
            <Typography component={'h6'} variant='body1'>
              {toPersianDigit((equipment.sending?.toString() as string) ?? '0')}
            </Typography>
            <Typography component={'h6'} variant='body2'>
              در حال ارسال
            </Typography>
          </Stack>
        </article>
      </Stack>
    </Paper>
  );
}
