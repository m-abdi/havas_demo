import '../public/css/fonts.css';
import 'react-spinner-animated/dist/index.css';
import '../src/NextJsServerSecurityToken';

import { CacheProvider, EmotionCache } from '@emotion/react';
import React, { useState } from 'react';

import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { createContext } from 'react';
import createEmotionCache from '../src/createEmotionCache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import theme from '../src/theme';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
function RTL(props: any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
//snackbar context for messages
export const SnackbarContext = createContext({
  snackbarOpen: false,
  setSnackbarOpen: (status: boolean) => {},
  snackbarMessage: '' as string,
  setSnackbarMessage: (message: string) => {},
  snackbarColor: 'success' as 'success' | 'error' | 'info',
  setSnackbarColor: (color: 'success' | 'error' | 'info') => {},
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export const InfoContext = createContext(undefined);

export default function MyApp(props: MyAppProps) {
  // custom context
  const [info, setInfo] = React.useState({
    pageName: 'داشبورد',
  });
  const infoContext:any = React.useMemo(
    () => ({
      pageName: info.pageName,
      changePageName: (newName: string) => {
        setInfo({ ...info, pageName: newName });
      },
    }),
    [info]
  );
  // snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(
    'success' as 'success' | 'error' | 'info'
  );
  const snackbarData: any = React.useMemo(
    () => ({
      snackbarOpen,
      setSnackbarOpen,
      snackbarMessage,
      setSnackbarMessage,
      snackbarColor,
      setSnackbarColor,
    }),
    [snackbarOpen, snackbarMessage, snackbarColor, snackbarOpen]
  );
  //
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <RTL>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <SnackbarContext.Provider value={snackbarData}>
            <InfoContext.Provider value={infoContext}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SessionProvider session={props.pageProps.session}>
                <Component {...pageProps} />
              </SessionProvider>
            </InfoContext.Provider>
          </SnackbarContext.Provider>
        </ThemeProvider>
      </RTL>
    </CacheProvider>
  );
}
