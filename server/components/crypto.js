const crypto = require('crypto')


module.exports.createPasswordPbkdf2 = (pw) => {
  const salt = crypto.randomBytes(32).toString('base64')
  const encodedPw = crypto.pbkdf2Sync(pw, salt, 99381, 32, 'sha512').toString('base64')
  return {encodedPw, salt}
}

module.exports.createRandomUserCode = (userId) => {
  const salt = crypto.randomBytes(32).toString('base64')
  const userCode = crypto.pbkdf2Sync(userId, salt, 99381, 6, 'sha512').toString('base64')
  return {userCode, userId}
}


module.exports.getPasswordPbkdf2 = (pw, salt) => {
  return crypto.pbkdf2Sync(pw, salt, 99381, 32, 'sha512').toString('base64')
}

module.exports.createSha512Base64 = (text) => {
  return crypto.createHash('sha512').update(text).digest('base64')
}

