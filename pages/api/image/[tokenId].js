//-----------------------------------------------------------------------------
// Copyright (c) 2022 Genetic Chain LLC.  All Rights Reserved.
//-----------------------------------------------------------------------------
// image/:tokenId.js - token image
//-----------------------------------------------------------------------------

import { find          } from 'ramda';
import { apiWrapper
       , isIntParam    } from 'helpers/api';

import Cors from 'cors';

//-----------------------------------------------------------------------------
// globals
//-----------------------------------------------------------------------------

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

//-----------------------------------------------------------------------------
// functions
//-----------------------------------------------------------------------------

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) =>
    fn(req, res, result =>
      result instanceof Error
        ? reject(result)
        : resolve(result)));

//-----------------------------------------------------------------------------
// handler
//-----------------------------------------------------------------------------

const handler = apiWrapper(async (req, res) => {
  const { tokenId } = req.query;

  // add cors
  await runMiddleware(req, res, cors);

  // validate input
  if (!isIntParam(tokenId)) {
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=2592000');
    res.status(404).end('');
    return;
  }

  // cache max possible
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=2592000');

  // load token data
  const manifest = require('data/tokens.json');
  const metadata = manifest[tokenId];

  // redirect with 308 to enable caching on vercel
  console.log(`redirecting to: ${metadata.image}`);
  res.redirect(308, metadata.image);

});

//-----------------------------------------------------------------------------
// exports
//-----------------------------------------------------------------------------

export default handler;
