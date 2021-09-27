'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require('./config')

module.exports = (middlewares) => {
  app.use(cors({
    origin: true,
    credentials: true
  }))
  app.use(bodyParser.json({limit: '1mb'}))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(morgan('common'))
  app.use(helmet())
  app.use(cookieParser()); 

  middlewares.forEach(middleware => {
    app.use(middleware)
  })

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  routes(app, morgan)
  return app
}
