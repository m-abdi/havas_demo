import { CacheProvider, EmotionCache } from '@emotion/react';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import theme from '../theme';

const session = {
  user: {
    id: '123',
    firstName: 'مهدی',
    lastName: 'عبدی',
    title: 'مدیریت',
  },
  expires: '13',
};

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
function RTL(props: any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
export default function StoriesDecorator({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <RTL>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <Stack
            alignItems={'center'}
            justifyContent='center'
            sx={{ inlineSize: '100%', blockSize: '100%'}}
          >
            {children}
          </Stack>
        </SessionProvider>
      </ThemeProvider>
    </RTL>
  );
}
