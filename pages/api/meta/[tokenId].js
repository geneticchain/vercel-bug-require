//-----------------------------------------------------------------------------
// Copyright (c) 2022 Genetic Chain LLC.  All Rights Reserved.
//-----------------------------------------------------------------------------
// meta/:tokenId.js - token metadata
//-----------------------------------------------------------------------------

import * as R from 'ramda';

import { apiWrapper
       , isIntParam    } from 'helpers/api';

import Cors from 'cors';

//-----------------------------------------------------------------------------
// constants
//-----------------------------------------------------------------------------

const kBaseUri = process.env.BASE_URI;

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

  // [moiz]:: holy fuck... the require creates a global memory
  //   which can technically be used by other api points... and
  //   the following code would cause the memory to be overwritten
  //   and stomped on even in the other api route ;|

  // load token data
  const manifest = require('data/tokens.json');
  const metadata = manifest[tokenId];

  // update metadata with local image route
  metadata.image = `${kBaseUri}/api/image/${tokenId}`;

  // cache max possible
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=2592000');

  // handle request
  res.status(200).json(metadata);

});

//-----------------------------------------------------------------------------
// exports
//-----------------------------------------------------------------------------

export default handler;
