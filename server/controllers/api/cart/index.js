'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./cart-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: '장바구니 추가 (특정 상품을 장바구니에 추가할 때 사용한다)',
  schema: 'PostCart',
  tags: ['Cart'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'success'},
    400: {description: 'Invalid data'},
    409: {description: 'already implemented'}
  },
  handler: ctrl.register
})

// module.exports.update = new ApiRouter({
//   name: ':cart_idx',
//   method: 'put',
//   summary: '장바구니 수정',
//   schema: 'UpdateCart',
//   tags: ['Cart'],
//   description:'',
//   isPublic: true,
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'}
//   },
//   handler: ctrl.update
// })

module.exports.delete = new ApiRouter({
  name: ':cart_idx',
  method: 'delete',
  summary: '장바구니 삭제 (유저가 특정 상품을 장바구니에서 삭제할 때 사용합니다.',
  schema: 'DeleteCart',
  tags: ['Cart'],
  path:"cart_idx",
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
  summary: '장바구니 조회 (특정 유저의 장바구니 리스트를 불러올 때도 사용됩니다)',
  schema: 'GetCart',
  description: '',
  tags: ['Cart'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
