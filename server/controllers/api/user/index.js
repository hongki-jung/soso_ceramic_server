'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./user-ctrl')


module.exports.signUp = new ApiRouter({
  name: 'signup',
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
  name: "signin",
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
  name: ':user_idx',
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
  name: ':user_idx',
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

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: '유저 조회',
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

module.exports.authNumberSendByEmail = new ApiRouter({
  name:'email-certification/send',
  metod:'post',
  summary:'이메일로 인증번호를 보냅니다.',
  schema: 'AuthNumSend',
  tags: ['User'],
  description: '',
  isPublic: true,
  responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
  },
  handler: ctrl.authNumberSend
})


module.exports.tokenCheck = new ApiRouter({
  name:'tokenCheck',
  metod:'get',
  summary:'토큰 확인',
  schema: 'tokenCheck',
  tags: ['User'],
  description: '',
  isPublic: true,
  responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
  },
  handler: ctrl.tokenCheck
})


module.exports.logout = new ApiRouter({
  name:'logout',
  metod:'get',
  summary:'유저 로그아웃',
  schema: 'LogoutUser',
  tags: ['User'],
  description: '',
  isPublic: true,
  responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
  },
  handler: ctrl.logout
})