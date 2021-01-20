import { AppProps } from 'next/app';
import reset from 'styled-reset';
import React from 'react';
import Head from 'next/head';
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider, StylesProvider } from '@material-ui/styles';

import theme from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}
  // Write your global styles.
`;

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width,initial-scale=1.0,viewport-fit=cover"
        />
        <meta name="Description" content="RedStone fan site with next.js" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c"
          rel="preload"
          as="style"
        />
        <title key="title">RedStone fan site</title>
      </Head>

      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </>
  );
};

export default App;
