//-----------------------------------------------------------------------------
// Copyright (c) 2021 Genetic Chain LLC.  All Rights Reserved.
//-----------------------------------------------------------------------------
// _app.js - react app entry point
//-----------------------------------------------------------------------------

import Head from 'next/head'

//-----------------------------------------------------------------------------
// main
//-----------------------------------------------------------------------------

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

//-----------------------------------------------------------------------------
// exports
//-----------------------------------------------------------------------------

export default App;
