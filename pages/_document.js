//-----------------------------------------------------------------------------
// Copyright (c) 2021 Genetic Chain LLC.  All Rights Reserved.
//-----------------------------------------------------------------------------
// _document.js - override page setup
//-----------------------------------------------------------------------------

import Document, {
       Html,
       Head,
       Main,
       NextScript } from 'next/document';
import Script from 'next/script';

//-----------------------------------------------------------------------------
// react components
//-----------------------------------------------------------------------------

class GCDocument extends Document
{

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps
    };
  }

  render() {
    return (
      <Html className="h-full">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}

//-----------------------------------------------------------------------------
// exports
//-----------------------------------------------------------------------------

export default GCDocument;
