import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';
import * as React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja-JP">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const scSheet = new ServerStyleSheet();
  const muiSheets = new MaterialServerStyleSheets();
  const origRenderPage = ctx.renderPage;

  const renderOptions = {
    enhanceApp: (App) => (props) => scSheet.collectStyles(muiSheets.collect(<App {...props} />)),
  };

  try {
    ctx.renderPage = () => origRenderPage(renderOptions);
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        muiSheets.getStyleElement(),
        scSheet.getStyleElement(),
      ],
    };
  } finally {
    scSheet.seal();
  }
};

export default MyDocument;
