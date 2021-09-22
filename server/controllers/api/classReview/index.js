'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./classReview-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostClassReview',
  tags: ['ClassReview'],
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
  name: ':IDX',
  method: 'put',
  summary: 'Update',
  schema: 'UpdateClassReview',
  tags: ['ClassReview'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':IDX',
  method: 'delete',
  summary: 'Delete',
  schema: 'DeleteClassReview',
  tags: ['ClassReview'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
})

module.exports.get = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'Get',
  schema: 'GetClassReview',
  description: '',
  tags: ['ClassReview'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
