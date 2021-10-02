'use strict'

const categoryModel = require('../../../models/category')
const db = require('../../../components/db')

const util = require('../../../components/util')

// 상품 카테고리 추가
module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newCategory = req.options
    console.log('newCategory ',newCategory);
    
    const result = await categoryModel.insert(newCategory, connection)
    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품 카테고리 수정
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const cartegory_info = req.options

    console.log('cart_info', cart_info);

    const result = await categoryModel.update(cartegory_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found cartegory'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품 카테고리 삭제
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const cartegory_info = req.options;

    const result = await categoryModel.delete({cart_idx: cartegory_info.cartegory_idx}, connection)
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

// 상품 카테고리 조회
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options

    const result = await categoryModel.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

