import '../public/css/fonts.css';
import 'react-spinner-animated/dist/index.css';
import '../src/NextJsServerSecurityToken';

import * as React from 'react';

import { CacheProvider, EmotionCache } from '@emotion/react';

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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export const InfoContext = createContext({});

export default function MyApp(props: MyAppProps) {
  // custom context
  const [info, setInfo] = React.useState({
    data: {
      pageName: 'داشبورد',
    },
    changePageName: (newName: string) => {
      setInfo({ ...info, data: { pageName: newName } });
    },
  });
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <RTL>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <InfoContext.Provider  value={info}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SessionProvider session={props.pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </InfoContext.Provider>
        </ThemeProvider>
      </RTL>
    </CacheProvider>
  );
}