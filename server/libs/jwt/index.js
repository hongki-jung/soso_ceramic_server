const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync(`${__dirname}/private.pem`)
const publicKey = fs.readFileSync(`${__dirname}/public.pem`)
const privateRefreshKey = fs.readFileSync(`${__dirname}/private-ref.pem`)
const publicRefreshKey = fs.readFileSync(`${__dirname}/public-ref.pem`)


module.exports.createToken = async (payload,options,secret=privateKey) => {
  try {
    const token = await new Promise((resolve,reject)=>{
      resolve(jwt.sign(payload,secret,options))
    }).then(result=>{return result}) 
  
    return token
  } catch (err) {
    throw err
  }
}

module.exports.decodeToken = async (token,options,secret=publicKey) => {
  try {
    return await jwt.verify(token,secret,options)
  } catch (err) {
    throw {status: 401, errorMessage: err}
  }
}

module.exports.createAccessToken = async(data) => {
  try {

    const {userIdx, userId} = data
    const payload = {userIdx: userIdx, userId: userId}
    const tokenAccess = await this.createToken(payload, {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 7
    }).then((result)=>{
      return result
    })
    return tokenAccess
  } catch (e) {
    throw e
  }
}

module.exports.createRefreshToken = async(data, tokenSecret) => {
  try {
    const payload = {
      sub: data.user_idx
    }
    return await this.createToken(payload, {algorithm: 'HS256', expiresIn: 60 * 60 * 24 * 30 * 6}, tokenSecret)
  } catch (e) {
    throw e
  }
}

// async function generateToken(payload, isRefresh) {
//   try {
//     return await jwt.sign(payload, (isRefresh ? privateRefreshKey : privateKey),
//       {
//         algorithm: 'RS256',
//         expiresIn: isRefresh === true ? 60 * 60 * 24 * 30 * 6 : (process.env.NODE_ENV === 'local' ? 60 * 60 * 24 * 30 * 6 : 60 * 3)
//       })
//   } catch (err) {
//     throw err
//   }
// }

// module.exports.decodeToken = async (token) => {
//   try {
//     if (token && token.split(' ')[0] === 'Bearer') {
//       return await jwt.verify(token.split(' ')[1], publicKey, {algorithms: 'RS256'})
//     }
//     else {
//       throw 'AccessToken is empty'
//     }
//   } catch (err) {
//     throw {status: 401, errorMessage: err}
//   }
// }

// module.exports.decodeRefreshToken = async (token) => {
//   try {
//     if (token) {
//       return await jwt.verify(token, publicRefreshKey, {algorithms: 'RS256'})
//     }
//     else {
//       throw 'AccessToken is empty'
//     }
//   } catch (err) {
//     throw {status: 401, errorMessage: err}
//   }
// }

// module.exports.refreshToken = async (options) => {
//   try {
//     const payload = await jwt.verify(options.accessToken, publicKey, {algorithms: 'RS256', ignoreExpiration: true})
//     await jwt.verify(options.refreshToken, publicRefreshKey, {algorithms: 'RS256'})
//     delete payload.iat
//     delete payload.exp
//     delete payload.nbf
//     delete payload.jti
//     return await generateToken(payload)
//   } catch (err) {
//     throw {status: 401, errorMessage: err}
//   }
// }

// module.exports.decodeSocketToken = async (token) => {
//   try {
//     return await jwt.verify(token.split(' ')[1], publicKey, {algorithms: 'RS256'})
//   } catch (err) {
//     console.log('invalid_token')
//     throw 'invalid_token'
//   }
// }
