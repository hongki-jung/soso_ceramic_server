'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./user-ctrl')


module.exports.signUp = new ApiRouter({
  name: 'signUp',
  method: 'post',
  summary: '유저 회원가입',
  schema: 'SignUpUser',
  tags: ['User'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'success'},
    409: {description: 'Duplicate user'}
  },
  handler: ctrl.signUp
})

module.exports.signIn = new ApiRouter({
  name: "signIn",
  method: "post",
  summary: "유저 로그인",
  schema: "SignInUser",
  tags: ["User"],
  description: "",
  isPublic: true,
  responses: {
    200: { description: "Sign In success" },
    400: { description: "User not found" },
    401: { description: "Authentication failed" },
  },
  handler: ctrl.signIn,
});

module.exports.update = new ApiRouter({
  name: ':IDX',
  method: 'put',
  summary: 'update User ',
  schema: 'UpdateUser',
  tags: ['User'],
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
  summary: 'Delete ClassTime',
  schema: 'DeleteUser',
  tags: ['User'],
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
  summary: 'Get ClassTime',
  schema: 'GetUser',
  description: '',
  tags: ['User'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
