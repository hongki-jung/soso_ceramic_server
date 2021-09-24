'use strict'

const orderModel = require('../../../models/order')
const orderDetailModel = require('../../../models/orderDetail')

const db = require('../../../components/db')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newOrder = req.options
    newOrder.first_create_dt = util.getCurrentTime();
    // if (newOrder.productList && newOrder.productList.length > 0){
    //   // 멀티 인설트 구현
    //   orderDetailModel.insert({productList}, connection)
    // }


    const result = await orderModel.insert(newOrder, connection)
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
    const order_info = req.options
    console.log('order_info ',order_info);

    const result = await orderModel.update(order_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found order'}
    
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
    const order_info =req.options;
    console.log('delReview ',delReview);
    const result = await orderModel.delete({order_idx:order_info.order_idx}, connection)
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
    
    const result = await handler.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}
