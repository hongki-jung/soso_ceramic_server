'use strict'
const s3 = require('../../../components/s3')
const uuid = require('uuid/v4')
const config = require('../../../config')
const db = require('../../../components/db')

// const axios = require('axios')
var mime = require('mime-types')

// const sendMobileText = require('../../../components/sendMobileText')

// const hangjeongdong = require('../../../components/json/hangjeongdong.json')

module.exports.getImageUrl = async (req, res, next) => {
  try {
    console.log("getUserImageUrl : ", req.options);
    const { mimetype, type, idType, id, extension, filename } = req.options;
    console.log("mimetype : ", mimetype);
    console.log('extension ', extension);
    console.log('filename ',filename)

    // let path = `images/test.jpg`;
    let path = `sosoceramic/${type}/${id}/${uuid()}.${extension}`

    let finalFile = `${filename}.${extension}`;
    // let path = `test.png`
    const url = s3.generatePreSignedUrl({
      key: path,
      mimetype: mimetype,
    });
  
    // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
    
    console.log('url ',url)
    console.log('path ',path)

    res.status(200).json({ url, path });
  } catch (err) {
    next(err);
  }
};

module.exports.getExtension = async function (req, res, next) {
  console.log('getExtension')
  const { type } = req.options
  let extension = mime.extension(type)
  if (type == 'hwp') {
      extension = 'hwp';
  }
  res.status(200).json({ extension: extension });
}


// module.exports.getUpdatePresignedUrl = async (req, res, next) => {
//   try {
//     console.log('getUserImageUrl : ', req.options)
//     const {mimetype, path} = req.options
//     // let path = `test.png`
//     const url = s3.generatePreSignedUrl({
//       key: path,
//       mimetype: mimetype
//     })
//     // console.log('cloi.jpg')
//     // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
//     res.status(200).json({url})
//   }
//   catch (err) {
//     next(err)
//   }
// }