import { CacheProvider, EmotionCache } from '@emotion/react';

import Layout from './Components/Layout';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import theme from './theme';

const session = {
  user: {
    id: '123',
    firstName: 'مهدی',
    lastName: 'عبدی',
    role: {
      id: 'id',
      name: 'مدیریت',
      viewPerson: true,
      createPerson: true,
      editPerson: true,
      deletePerson: true,
      viewPlace: true,
      createPlace: true,
      editPlace: true,
      deletePlace: true,
      viewEquipment: true,
      createEquipment: true,
      editEquipment: true,
      deleteEquipment: true,
      viewAsset: true,
      createAsset: true,
      editAsset: true,
      deleteAsset: true,
      viewLicense: true,
      createLicense: true,
      editLicense: true,
      deleteLicense: true,
      viewTag: true,
      createTag: true,
      editTag: true,
      deleteTag: true,
      viewRole: true,
      createRole: true,
      editRole: true,
      deleteRole: true,
    },
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
        <SessionProvider session={session}>
            <Stack
              alignItems={'center'}
              justifyContent='center'
              sx={{ inlineSize: '100%', blockSize: '100%' }}
            >
              {children}
            </Stack>
        </SessionProvider>
      </ThemeProvider>
    </RTL>
  );
}
