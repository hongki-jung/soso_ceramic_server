'use strict'


const db = require('../../../components/db')
const util = require('../../../components/util')
const productModel = require('../../../models/product')



// 상품 등록
module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newProduct = req.options

    newProduct.first_create_dt = util.getCurrentTime()

    const result = await productModel.insert(newProduct, connection)

    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품 정보 수정
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const product_info = req.options
    const result = await productModel.update(product_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Product Not found'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품 삭제
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const product_info = req.options;
    
    const result = await productModel.delete({product_info: product_info.product_idx}, connection)
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

// 조건 별 상품 정보 조회
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    const result = await productModel.getList(params)
    // const total = await productModel.getListTotal(params)

    // const query = req.query
    // const pagenation = util.makePageData(total.length, req.options.page, req.options.srch_cnt)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

