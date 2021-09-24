'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./product-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: '상품등록',
  schema: 'RegisterProduct',
  tags: ['Product'],
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
  name: ':product_idx',
  method: 'put',
  summary: '상품 정보 수정 ',
  schema: 'UpdateProduct',
  tags: ['Product'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':product_idx',
  method: 'delete',
  summary: '상품 삭제',
  schema: 'DeleteProduct',
  tags: ['Product'],
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
  summary: '조건 별 상품 전체 조회 (조건에 맞는 상품을 불러올 때 사용합니다.)',
  schema: 'GetProduct',
  description: '',
  tags: ['Product'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})


module.exports.getProductDetailInfo = new ApiRouter({
  name: 'product-detail/:product_idx',
  method: 'get',
  summary: '특정 상품의 상세정보를 불러올 때 사용합니다. (상품의 상세 이미지도 불러 온다)',
  schema: 'GetProductDetail',
  description: '',
  tags: ['Product'],
  path: ["product_idx"],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getProductDetailInfo
})