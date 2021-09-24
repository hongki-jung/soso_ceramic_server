'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./category-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: '상품 카테고리 추가',
  schema: 'PostCategory',
  tags: ['Category'],
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
  name: ':category_idx',
  method: 'put',
  summary: '상품 카테고리 수정',
  schema: 'UpdateCategory',
  tags: ['Category'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':category_idx',
  method: 'delete',
  summary: '상품 카테고리 삭제',
  schema: 'DeleteCategory',
  tags: ['Category'],
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
  summary: '상품 카테고리 조회',
  schema: 'GetCategory',
  description: '',
  tags: ['Category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
