'use strict'


const db = require('../../../components/db')
const util = require('../../../components/util')
const productModel = require('../../../models/product')

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newProduct = req.options

    const result = await productModel.insert(newProduct, connection)
    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const product_info = req.options
    const result = await productModel.update(product_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found product'}
    
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
    const product_info =req.options;
    console.log('product_info ',product_info);
    console.log('product_info.IDX',product_info.IDX);
    
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

module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    const result = await productModel.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

