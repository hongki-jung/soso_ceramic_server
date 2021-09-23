'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./order-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'RegisterOrder',
  tags: ['Order'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'success'},
    400: {description: 'Invalid data'},
    409: {description: 'already implemented'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':order_idx',
  method: 'put',
  summary: 'Update',
  schema: 'UpdateOrder',
  tags: ['Order'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':order_idx',
  method: 'delete',
  summary: 'Delete',
  schema: 'DeleteOrder',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
})

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'Get',
  schema: 'GetOrder',
  description: '',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
