'use strict'

const cartModel = require('../../../models/cart')
const db = require('../../../components/db')

const util = require('../../../components/util')

// 장바구니에 추가
module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newCart = req.options
    console.log('newCart ',newCart);
    newCart.first_create_dt = util.getCurrentTime()

    const result = await cartModel.insert(newCart, connection)
    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 장바구니 수정
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const cart_info = req.options

    console.log('cart_info', cart_info);

    const result = await cartModel.update(cart_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found cart'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 장바구니 삭제
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const cart_info = req.options;

    const result = await cartModel.delete({cart_idx: cart_info.cart_idx}, connection)
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

// 장바구니 조회 (특정 유저의 장바구니 리스트를 불러올 때도 사용된다.)
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    console.log("params",params)
    const result = await cartModel.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

