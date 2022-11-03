//-----------------------------------------------------------------------------
// Copyright (c) 2021 Genetic Chain LLC.  All Rights Reserved.
//-----------------------------------------------------------------------------
// next.config.js - nextjs configuration
//  - reference: https://nextjs.org/docs/api-reference/next.config.js/introduction
//-----------------------------------------------------------------------------

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
      dns: false,
      net: false,
      tls: false
    };
    return config;
  }
}
