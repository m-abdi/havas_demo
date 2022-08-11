import { css, keyframes } from '@emotion/react';

import { Box } from '@mui/material';
import React from 'react';

const kf = keyframes`
     0%
  {
    transform: scale( .90 );
  }
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( .90 );
  }
  60%
  {
    transform: scale( 1 );
  }
  80%
  {
    transform: scale( .90 );
  }
  100%
  {
    transform: scale( .90 );
  }
`;
export default function HeartBeat({
  children,
  borderColor,
}: {
  children: any;
  borderColor: string;
}) {
  return (
    <Box
      sx={{
        p: 1,
        border: 2,
        borderColor,
        borderRadius: "10px",
        '@keyframes beat': {
          '0%': {
            transform: 'scale( .90 )',
          },
          '20%': {
            transform: 'scale( 1 )',
          },
          '40%': {
            transform: 'scale( .90 )',
          },
          '60%': {
            transform: 'scale( 1 )',
          },
          '80%': {
            transform: 'scale( .90 )',
          },
          '100%': {
            transform: 'scale( .90 )',
          },
        },
        animationName: 'beat',
        animationDuration: '6s',
        animationIterationCount: 'infinite',
      }}
    >
      {children}
    </Box>
  );
}
