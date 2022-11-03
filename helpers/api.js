//-----------------------------------------------------------------------------
// Copyright (c) 2021 Genetic Chain LLC.  All Rights Reserved.
//-----------------------------------------------------------------------------
// helpers/api.js - helpful api utilities
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// constants
//------------------------------------------------------------------------------

const kEnv = process.env.NEXT_PUBLIC_ENV;

//------------------------------------------------------------------------------
// functions
//------------------------------------------------------------------------------

/**
 * Check if param is an int.
 */
const isIntParam = param => Number.isInteger(+param)

//------------------------------------------------------------------------------

/**
 * Wraps api routes and catch errors allow client to render error without
 *   crashing and allowing functions to timeout.
 */
const apiWrapper = apiFn => (req, res) => apiFn(req, res)
  .catch(e => {
    // [moiz]:: add error logging here
    console.log(`Unhandled error in api:`, e);
    res.status(500)
      .json({
        status: 'error',
        error: 'Unhandled error occured in api.'});
  });

//------------------------------------------------------------------------------

/**
 * Conform to api success payload.
 */
const apiSuccess = (res, payload) =>
  res.status(200)
    .json({
      status: 'success',
      payload
    });

//------------------------------------------------------------------------------

/**
 * Conform to api error payload.
 */
const apiError = (res, code, msg) =>
  res.status(code)
    .json({
      status: 'error',
      error: msg
    });

//------------------------------------------------------------------------------
// export
//------------------------------------------------------------------------------

module.exports = {
  isIntParam
, apiWrapper
, apiSuccess
, apiError
};
