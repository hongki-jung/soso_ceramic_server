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

     // 유저 계정 존재 유무확인
    const user = await userModel.findOneById(userInfo.user_email);
    if (!user) throw { status: 400, errorMessage: "User not found" }
 
    // 유저 패스워드 체크
    const pwdCheck = crypto.getPasswordPbkdf2(userInfo.user_pwd, user.salt);

    if (user.user_pwd !== pwdCheck) throw {status: 401, errorMessage: "Authentication failed" }

    // access token 발급
    const access_token = await jwt.createAccessToken({userEmail: userInfo.user_email, userIdx: user.user_idx})

    delete user.user_pwd;
    delete user.salt;
    user.loginSuccess = true
    // 쿠키에 토큰을 담아서 보내준다
    res.cookie("w_auth", access_token).status(200).json({ result: user});

  } catch (err) {
    await db.rollback(connection);
    next(err);
  }
};

// 상품 배송받을 주소 등록
module.exports.postAddressBook = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const addressInfo = {...req.options};
    const result = await userModel.insertAddress(addressInfo, connection);
    await db.commit(connection)
    res.status(200).json({result: result});
  }catch (err) {
    await db.rollback(connection)
    next(err)
  }finally{
    await connection.destroy()
  }
}

// 유저 정보 수정
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const userInfo = req.options

    const result = await userModel.update(userInfo, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found user'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품을 배송받을 주소 수정
module.exports.updateAddressBook = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    
    const addressInfo = req.options

    const result = await userModel.updateAddress(addressInfo, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found user'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 유저 삭제
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const userInfo =req.options;
    const result = await userModel.delete({user_idx: userInfo.user_idx}, connection)
    await db.commit(connection)

    let returnValue = false;
    if(result.affectedRows === 1){ returnValue = true }

    res.status(200).json({result:returnValue})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 유저의 주소록을 삭제한다
module.exports.deleteAddressBook = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const userInfo =req.options;
    const result = await userModel.deleteAddressBook({user_idx: userInfo.user_idx}, connection)
    await db.commit(connection)

    let returnValue = false;
    if(result.affectedRows === 1){ returnValue = true }

    res.status(200).json({result:returnValue})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


// 유저 전체 조회
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

// 조건에 맞는 유저 조회 및 페이징
module.exports.getListPagination = async (req, res, next) =>{
  try{
    const params = req.options

    const result = await userModel.getList(params)
    const total = await userModel.getListTotal(params)
    const query = req.query

    const pagenation = util.makePageData(total, req.options.page, req.options.block, req.options.limit)

    res.status(200).json({result, query, pagenation})
  }catch(err){
    next(err)
  }
}




// 유저 이메일로 인증번호를 보낸다.
module.exports.authNumberSend = async(req, res, next)=>{
  const connection = await db.beginTransaction()
  try{
    
    const userInfo = req.options
    
    // 렌덤값 생성
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
   
    // 토큰이 없을 경우 실패 메시지 반환 (false)
    if(!token.w_auth) {return res.json({success:false, message: 'not logged in'})}
    
   // 토큰이 있을 경우 verify
    const decoded = await jwt.decodeToken(token.w_auth)
    
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

    // 쿠키의 담긴 토큰을 지워준다
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

    // 이미 등록된 이메일이 있을 경우 false
    if (userEmail) { return res.status(409).json({ success: false, message:'Duplicate Email'}) }
    
    // 이미 등록된 이메일이 없는 경우 true
    return res.status(200).json({success: true})
  }catch(err){
    next(err)
  }
}



