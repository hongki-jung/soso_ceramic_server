'use strict'


const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const nodemailer = require('../../../components/email')

const jwt = require('../../../libs/jwt/index')

const userModel = require('../../../models/user')

// 회원가입
module.exports.signUp = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options;

    // id 중복체크
    const userId = await userModel.findOneById(newUser.user_id);
    if (userId) {  throw { status: 409, errorMessage: "Duplicate ID" };}

    // pwd 암호화 
    const { salt, encodedPw } = crypto.createPasswordPbkdf2(newUser.user_pwd);
    newUser.salt = salt;
    newUser.user_pwd = encodedPw;
 
    // refresh token 발급
    // const token = await jwt.createRefreshToken({user_id: newUser.user_id, user_email: newUser.user_email})
    // newUser.refresh_token = token

    // 회원가입 시간
    newUser.first_create_dt = util.getCurrentTime();

    const result = await userModel.insert(newUser, connection);
    await db.commit(connection)

    res.status(200).json({result: result});
  }catch (err) {
    await db.rollback(connection)
    next(err)

  }finally{
    await connection.destroy()
  }
}

// 로그인
module.exports.signIn = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try {

    const userInfo = req.options;
    const user = await userModel.findOneById(userInfo.user_id);

    // 유저 계정 존재 유무확인
    if (!user) throw { status: 400, errorMessage: "User not found" }
    console.log("userInfo",userInfo)
    console.log("user ?",user)
    // 유저 패스워드 체크
    const pwdCheck = crypto.getPasswordPbkdf2(userInfo.user_pwd, user.salt);

    if (user.user_pwd !== pwdCheck) throw {status: 401, errorMessage: "Authentication failed" }

    // access token 발급
    const access_token = await jwt.createAccessToken({userId: userInfo.user_id, userIdx: user.user_idx})
    console.log("access_token ?",access_token)
    delete user.user_pwd;
    delete user.salt;
    user.loginSuccess = true
    res.cookie("w_auth", access_token).status(200).json({ result: user});

  } catch (err) {
    await db.rollback(connection);
    next(err);
  }
};


module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const userInfo = req.options

    console.log('userInfo', userInfo);

    const result = await userModel.update(userInfo, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found lecture'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const userInfo =req.options;
    const result = await userModel.delete({user_idx: userInfo.user_idx}, connection)
    await db.commit(connection)
    let returnValue = false;
    if(result.affectedRows === 1){
      returnValue = true
    }
    res.status(200).json({result:returnValue})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    console.log('hihi')
    const result = await userModel.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}


module.exports.authNumberSend = async(req, res, next)=>{
  const connection = await db.beginTransaction()
  try{
    
    const userInfo = req.options
    let firstNum = Math.ceil(Math.random(9)*10)
    if(firstNum>9)
      firstNum -=1
  
    const min = Math.ceil(100)
    const max = Math.floor(1000)
    const rest = Math.ceil(Math.random() * (max - min) + min)
    const authNum = String(firstNum)+String(rest)

    // 받는사람 이메일주소, 인증번호
    const sendResult = await nodemailer.sendEmail(userInfo.user_email,authNum)
    await db.commit(connection)
    res.status(200).json({result: sendResult, auth_num: authNum})

  }catch(err){
    await db.rollback(connection)
    next(err)
  }
  finally{
    await connection.destroy()
  }
}




module.exports.auth = async (req, res, next) => {
  try {
    const params = req.options
    const token = req.cookies

    const decoded = await jwt.decodeToken(token.w_auth)
    // console.log("decoded in auth",decoded)
    res.status(200).json(decoded)
  }
  catch (err) {
    next(err)
  }
}