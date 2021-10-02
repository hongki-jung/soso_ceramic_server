'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./common-ctrl')




module.exports.getImageUrl = new ApiRouter({
  name: "image/url",
  method: "get",
  summary: "s3 pre-signed url을 불러올 때 사용합니다",
  schema: "GetImagePreSignedUrl",
  tags: ["Common"],
  isPublic: "true",
  responses: {
    200: { description: "Success" },
    400: { description: "Invalid data" },
  },
  handler: ctrl.getImageUrl,
});

module.exports.getExtension = new ApiRouter({
  name: 'getExtension',
  method: 'get',
  summary: 'getExtension',
  tags: ['Common'],
  schema: 'GetExtention',
  isPublic: true,
  responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
  },
  handler: ctrl.getExtension   
})


// module.exports.getUpdatePresignedUrl = new ApiRouter({
//   name: 'image/update/url',
//   method: 'get',
//   summary: '이미 등록된 이미지를 교체합니다',
//   schema: 'GetUpdatePresignedUrl',
//   tags: ['Common'],
//   isPublic:'true',
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'}
//   },
//   handler: ctrl.getUpdatePresignedUrl
// })