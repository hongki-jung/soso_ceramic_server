'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./notice-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: '공지사항 추가',
  schema: 'PostNotice',
  tags: ['Notice'],
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
  name: ':notice_idx',
  method: 'put',
  summary: '공지사항 수정 ',
  schema: 'UpdateNotice',
  tags: ['Notice'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':notice_idx',
  method: 'delete',
  summary: '공지사항 삭제',
  path:["notice_idx"],
  schema: 'DeleteNotice',
  tags: ['Notice'],
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
  summary: '공지사항 조회 및 페이징',
  schema: 'GetNotice',
  description: '',
  tags: ['Notice'],
  // path:["notice_idx"],
  required:false,
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
