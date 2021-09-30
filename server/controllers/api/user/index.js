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

// 유저 주소록 추가 (상품을 배송받을 주소 등록)
module.exports.postAddressBook = new ApiRouter({
  name: "address",
  method: "post",
  summary: "유저 주소록 추가 (상품을 배송받을 주소 등록)",
  schema: "PostAddressBook",
  tags: ["User"],
  description: "",
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.postAddressBook,
});



module.exports.update = new ApiRouter({
  name: ':user_idx',
  method: 'put',
  summary: '유저 정보 수정',
  schema: 'UpdateUser',
  tags: ['User'],
  description:'',
  path:["user_idx"],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

// 유저 주소록 수정 (상품을 배송받을 주소 수정)
module.exports.updateAddressBook = new ApiRouter({
  name: 'address/:user_idx',
  method: 'put',
  summary: '유저 주소록 수정 (상품을 배송받을 주소 수정)',
  schema: 'UpdateAddressBook',
  tags: ['User'],
  description:'',
  path:["user_idx"],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.updateAddressBook
})


module.exports.delete = new ApiRouter({
  name: ':user_idx',
  method: 'delete',
  summary: '유저 삭제',
  schema: 'DeleteUser',
  tags: ['User'],
  path:["user_idx"],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
})


module.exports.deleteAddressBook = new ApiRouter({
  name: 'address/:user_idx',
  method: 'delete',
  summary: '유저 주소록 삭제',
  schema: 'DeleteAddressBook',
  tags: ['User'],
  path:["user_idx"],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.deleteAddressBook
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
  summary:'유저 로그아웃 (토큰을 제거해줍니다)',
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


module.exports.emailDuplicateCheck = new ApiRouter({
  name:'user-email/:user_email/exists',
  metod:'post',
  summary:'이메일 중복 검사',
  schema: 'EmailDuplicateCheck',
  tags: ['User'],
  description: '',
  isPublic: true,
  path:["user_email"],
  responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
  },
  handler: ctrl.emailDuplicateCheck
})
