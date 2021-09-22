'use strict'

const serializeError = require('serialize-error')

function errorHandler(err, req, res, next) {
  let status = err.status && !isNaN(err.status) ? err.status : 500
  let errorMessage

  if (err.errorMessage instanceof Error) {
    try {
      err.errorMessage = serializeError(err.errorMessage)
    }
    catch (error) {
      err.errorMessage = error
    }
  }
  else if (typeof err === 'string') {
    err = {errorMessage: err}
  }
  else if (typeof err === 'object') {
    try {
      err = serializeError(err)
    }
    catch (error) {
      err = error
    }
  }
  if (!errorMessage && req.app.get('env') === 'production') {
    if (errorMessage) delete errorMessage.stack
  }
  delete err.status
  res.status(status || 500).json(serializeError(err) || {})
  res.end()
}

module.exports = (app) => {
  app.use(function (req, res, next) {
    if (req.path.startsWith('/api/') || req.path.startsWith('/swagger/')) {
      const err = new Error('Not Found')
      err.status = 404
      next(err)
    }
    else {
      next()
    }

  })
  app.use(errorHandler)
}