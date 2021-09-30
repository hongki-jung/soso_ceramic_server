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

    // email 중복체크
    const userEmail = await userModel.findOneById(newUser.user_email);
    if (userEmail) {  throw { status: 409, errorMessage: "Duplicate ID" };}

    // pwd 암호화 
    const { salt, encodedPw } = crypto.createPasswordPbkdf2(newUser.user_pwd);
    newUser.salt = salt;
    newUser.user_pwd = encodedPw;
 
    // refresh token 발급
    // const token = await jwt.createRefreshToken({user_email: newUser.user_email, user_email: newUser.user_email})
    // newUser.refresh_token = token

    // 회원가입 일/시간
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
    const user = await userModel.findOneById(userInfo.user_email);

    // 유저 계정 존재 유무확인
    if (!user) throw { status: 400, errorMessage: "User not found" }
 
    // 유저 패스워드 체크
    const pwdCheck = crypto.getPasswordPbkdf2(userInfo.user_pwd, user.salt);

    if (user.user_pwd !== pwdCheck) throw {status: 401, errorMessage: "Authentication failed" }

    // access token 발급
    const access_token = await jwt.createAccessToken({userEmail: userInfo.user_email, userIdx: user.user_idx})

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

// 유저 조회
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    
    const result = await userModel.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

// 유저 이메일로 인증번호를 보낸다.
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



// 토큰 체크
module.exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.cookies
    
    // 토큰이 없을 경우 실패 메시지
    if(!token.w_auth) {return res.json({success:false, message: 'not logged in'})}
    
    const decoded = await jwt.decodeToken(token.w_auth)
    // console.log("decoded in auth",decoded)
    res.status(200).json(decoded)
  }
  catch (err) {
    next(err)
  }
}

// 로그아웃
module.exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies
    
    // 토큰이 없을 경우 실패 메시지
    if(!token){ return res.status(403).json({success:false, message: 'not logged in'})}

    return res.cookie("w_auth","").json({logoutSuccess: true})
  }
  catch (err) {
    next(err)
  }
}

// email 중복체크
module.exports.emailDuplicateCheck = async(req, res, next) => {
  
  try{
    const newUser = req.options;
    const userEmail = await userModel.findOneById(newUser.user_email);

    // 이미 등록된 이메일이 있을 경우
    if (userEmail) { return res.status(409).json({ success: false, message:'Duplicate Email'}) }
    
    return res.status(200).json({success: true})

  }catch(err){
    next(err)
  }

}



