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
    console.log('getUserImageUrl : ', req.options)
    const {mimetype, idType, id, extension, filename} = req.options
    console.log('mimetype : ',mimetype)
    let path =`images/cloi.jpg`
    let finalFile = `${filename}.${extension}`;
    // let path = `test.png`
    const url = s3.generatePreSignedUrl({
      key: path,
      mimetype: mimetype
    })
    console.log('cloi.jpg')
    // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
    res.status(200).json({url, path})
  }
  catch (err) {
    next(err)
  }
}
