import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type { DocumentContext } from 'next/document';

const MyDocument = () => (
  <Html lang="en">
    <Head>
      <link
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5Q1Aj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJk190evSCWr3W6A=="
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xq1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAi56JXm"
        crossOrigin="anonymous"
      />
      {/* <script
        async
        src="https://your-script-url.js"
      /> */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;