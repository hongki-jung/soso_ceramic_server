'use strict'

const Schemas = require('../schemas/index')

async function verifyOptions(req, path, schema) {
  const options = Object.assign({}, req.params, req.query, req.body, req.file)
  try {
    if (path) Schemas.convert(options, path)
    if (schema) Schemas.convert(options, schema, {coerceTypes: 'array'})
  }
  catch (err) {
    throw {status: 400, errorMessage: err}
  }
  return options
}

module.exports = (path, schema) => {
  return async (req, res, next) => {
    try {
      req.options = await verifyOptions(req, path, schema)
      next()
    }
    catch (err) {
      next(err)
    }
  }
}