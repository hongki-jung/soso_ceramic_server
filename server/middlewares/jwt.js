'use strict'

const Jwt = require('../libs/jwt/index')
// const usersModel = require('../models/users')

module.exports = async (req, res, next) => {
  try {
    // console.log("loginType ", req.headers.logintype)
    const loginType = req.headers.logintype
    const jwtToken = await Jwt.decodeToken(req.headers.authorization)
    req.userSeq = jwtToken.sub
    if(loginType === undefined){
      // console.log("login user")
      // const user = await usersModel.findOneUser(req.userSeq)      
      const authorization = `Bearer ${user.token}`
      // console.log('decodeToken')
      // console.log(authorization)
      // console.log()
      // console.log(req.headers.authorization)
      // console.log(authorization !== req.headers.authorization)
      if(authorization !== req.headers.authorization) {
        throw {status: 401, errorMessage: 'Invalid token'}
      }
    } else {
      // console.log("login admin")
      // const user = await adminModel.findOneAdmin(req.userSeq)
      // const authorization = `Bearer ${user.token}`
      // console.log('decodeToken')
      // console.log(authorization)
      // console.log()
      // console.log(req.headers.authorization)
      // console.log(authorization !== req.headers.authorization)
      // if(authorization !== req.headers.authorization) {
      //   throw {status: 401, errorMessage: 'Invalid token'}
      // }
    }
    
    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports.decodeToken = async (accessToken) => {
  const jwtToken = await Jwt.decodeToken(accessToken)
  return jwtToken.sub
}

module.exports.decodeSocketToken = async (socket, next) => {
  try {
    console.log('decodeSocketToken')
    socket.tokenError = null
    const accessToken = `Bearer ${socket.handshake.query.accessToken}`
    const jwtToken = await Jwt.decodeSocketToken(accessToken)

    // console.log('jwtToken')
    // console.log(jwtToken)
    if(jwtToken) {
      socket.auth = {
        userSeq: jwtToken.sub
      }
      const user = await usersModel.findOneUser(socket.auth.userSeq)
      const authorization = `Bearer ${user.token}`

      if(authorization !== accessToken) {
        throw 'invalid_token'
      }
    }
    else {
      throw 'invalid_token'
    }
    next()
  }
  catch (err) {
    const error = new Error(err)
    next(error)
  }
}
