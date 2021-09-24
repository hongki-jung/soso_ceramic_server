'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./order-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: '주문',
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
  summary: '주문 상태 변경',
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
  summary: '주문 취소',
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
  summary: '주문 정보 조회 (주문 정보와 주문한 유저의 정보 등을 불러온다)',
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
